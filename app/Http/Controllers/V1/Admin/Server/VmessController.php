<?php

namespace App\Http\Controllers\V1\Admin\Server;

use App\Services\ServerService;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServerVmessSave;
use App\Http\Requests\Admin\ServerVmessUpdate;
use App\Models\ServerVmess;
use Illuminate\Http\Request;

class VmessController extends Controller
{
    public function save(ServerVmessSave $request)
    {
        $params = $request->validated();
        if (!empty($params['parent_id'])) {
            $parent = ServerVmess::find($params['parent_id']);
            if (!$parent) {
                abort(500, '指定的父节点不存在或非同协议节点');
            }
            if (!empty($parent->parent_id)) {
                abort(500, '子节点不能再作为父节点，不支持多级继承');
            }
            if ($request->input('id') && (int)$parent->id === (int)$request->input('id')) {
                abort(500, '节点不能将自身设为父节点');
            }
        }

        if ($request->input('id')) {
            $server = ServerVmess::find($request->input('id'));
            if (!$server) {
                abort(500, '服务器不存在');
            }
            try {
                $server->update($params);
            } catch (\Exception $e) {
                abort(500, '保存失败');
            }
            return response([
                'data' => true
            ]);
        }

        DB::beginTransaction();
        try {
            $params['id'] = ServerService::getNextAvailableId(ServerVmess::class);
            $instance = new ServerVmess();
            foreach ($params as $k => $v) {
                $instance->{$k} = $v;
            }
            if (!$instance->save()) {
                throw new \Exception('创建失败');
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            abort(500, '创建失败');
        }

        return response([
            'data' => true
        ]);
    }

    public function drop(Request $request)
    {
        if ($request->input('id')) {
            $server = ServerVmess::find($request->input('id'));
            if (!$server) {
                abort(500, '节点ID不存在');
            }
        }
        return response([
            'data' => $server->delete()
        ]);
    }

    public function update(ServerVmessUpdate $request)
    {
        $params = $request->only([
            'show',
        ]);

        $server = ServerVmess::find($request->input('id'));

        if (!$server) {
            abort(500, '该服务器不存在');
        }
        try {
            $server->update($params);
        } catch (\Exception $e) {
            abort(500, '保存失败');
        }

        return response([
            'data' => true
        ]);
    }

    public function copy(Request $request)
    {
        $server = ServerVmess::find($request->input('id'));
        if (!$server) {
            abort(500, '服务器不存在');
        }
        $server->show = 0;
        $name = trim((string) $request->input('name'));
        $server->name = $name ?: ($server->name . ' - 副本');
        DB::beginTransaction();
        try {
            $attributes = $server->toArray();
            $attributes['id'] = ServerService::getNextAvailableId(ServerVmess::class);
            $instance = new ServerVmess();
            foreach ($attributes as $k => $v) {
                $instance->{$k} = $v;
            }
            if (!$instance->save()) {
                throw new \Exception('复制失败');
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            abort(500, '复制失败');
        }

        return response([
            'data' => true
        ]);
    }
}
