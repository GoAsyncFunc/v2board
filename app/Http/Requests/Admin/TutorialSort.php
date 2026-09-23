<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TutorialSort extends FormRequest
{
    public function rules()
    {
        return ['tutorial_ids' => 'required|array'];
    }
}
