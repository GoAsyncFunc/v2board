<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TutorialSave extends FormRequest
{
    public function rules()
    {
        return [
            'category_id' => 'required|integer|in:1,2,3,4,5,6',
            'title' => 'required|string',
            'steps' => 'nullable|string'
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => '教程分类不能为空',
            'category_id.in' => '教程分类格式不正确',
            'title.required' => '标题不能为空'
        ];
    }
}
