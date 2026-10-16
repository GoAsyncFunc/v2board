<?php

namespace App\Http\Controllers\V1\Admin\Server;

use App\Services\ServerService;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Models\ServerAnytls;
use Illuminate\Http\Request;

class AnyTLSController extends Controller
{
    public function save(Request $request)
    {
        $params = $request->validate([
            'show' => '',
            'name' => 'required',
            'group_id' => 'required|array',
            'route_id' => 'nullable|array',
            'parent_id' => 'nullable|integer',
            'host' => 'required',
            'port' => 'required',
            'server_port' => 'required',
            'tags' => 'nullable|array',
            'rate' => 'required|numeric',
            'server_name' => 'nullable',
            'insecure' => 'required|in:0,1',
            'padding_scheme' => 'nullable',
        ]);

        if (isset($params['padding_scheme'])) {
            $params['padding_scheme'] = json_decode($params['padding_scheme']);
        }

        if ($request->input('id')) {
            $server = ServerAnytls::find($request->input('id'));
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
            $params['id'] = ServerService::getNextAvailableId(ServerAnytls::class);
            $instance = new ServerAnytls();
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
            $server = ServerAnytls::find($request->input('id'));
            if (!$server) {
                abort(500, '节点ID不存在');
            }
        }
        return response([
            'data' => $server->delete()
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'show' => 'in:0,1'
        ], [
            'show.in' => '显示状态格式不正确'
        ]);
        $params = $request->only([
            'show',
        ]);

        
        if (!empty($params['parent_id'])) {
            $parent = ServerAnytls::find($params['parent_id']);
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
$server = ServerAnytls::find($request->input('id'));

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
        $server = ServerAnytls::find($request->input('id'));
        if (!$server) {
            abort(500, '服务器不存在');
        }
        $server->show = 0;
        $name = trim((string) $request->input('name'));
        $server->name = $name ?: ($server->name . ' - 副本');
        DB::beginTransaction();
        try {
            $attributes = $server->toArray();
            $attributes['id'] = ServerService::getNextAvailableId(ServerAnytls::class);
            $instance = new ServerAnytls();
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
