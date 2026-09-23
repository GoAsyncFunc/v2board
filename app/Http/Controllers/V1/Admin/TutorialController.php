<?php

namespace App\Http\Controllers\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TutorialSave;
use App\Http\Requests\Admin\TutorialSort;
use App\Models\Tutorial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TutorialController extends Controller
{
    public function fetch(Request $request)
    {
        if ($request->filled('id')) {
            $tutorial = Tutorial::find($request->input('id'));
            if (!$tutorial) abort(404, '教程不存在');
            return response(['data' => $tutorial]);
        }
        return response(['data' => Tutorial::orderBy('sort', 'ASC')->get()]);
    }

    public function save(TutorialSave $request)
    {
        $params = $request->validated();
        if (!$request->input('id')) {
            if (!Tutorial::create($params)) abort(500, '创建失败');
        } else {
            $tutorial = Tutorial::find($request->input('id'));
            if (!$tutorial) abort(404, '教程不存在');
            try {
                $tutorial->update($params);
            } catch (\Exception $e) {
                abort(500, '保存失败');
            }
        }
        return response(['data' => true]);
    }

    public function show(Request $request)
    {
        $tutorial = Tutorial::find($request->input('id'));
        if (!$tutorial) abort(404, '教程不存在');
        $tutorial->show = $tutorial->show ? 0 : 1;
        return response(['data' => $tutorial->save()]);
    }

    public function sort(TutorialSort $request)
    {
        DB::beginTransaction();
        try {
            foreach ($request->input('tutorial_ids') as $index => $id) {
                $tutorial = Tutorial::find($id);
                if (!$tutorial) abort(404, '教程不存在');
                $tutorial->timestamps = false;
                $tutorial->update(['sort' => $index + 1]);
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
        return response(['data' => true]);
    }

    public function drop(Request $request)
    {
        $tutorial = Tutorial::find($request->input('id'));
        if (!$tutorial) abort(404, '教程不存在');
        return response(['data' => $tutorial->delete()]);
    }
}
