@extends('twill::layouts.form')

@section('contentFields')
    @formField('input', [
        'name' => 'page',
        'label' => 'Content Type',
        'translated' => true,
        'maxlength' => 100
    ])

    @formField('input', [
    'name' => 'subtitle',
    'label' => 'Subtitle',
    'maxlength' => 100,
    'required' => true,
    'note' => 'Hint message goes here',
    'placeholder' => 'Placeholder goes here',
])

@formField('wysiwyg', [
    'name' => 'article',
    'label' => 'Sub-Page Content',
    'toolbarOptions' => [
     [ 'header' => [1, 2, false] ],
      'list-ordered',
      'list-unordered',
      [ 'indent' => '-1']
      [ 'indent' => '+1' ]
      ],
    'placeholder' => 'Page Content',
    'maxlength' => 200,
    'editSource' => true,
    'note' => 'Fill Page Content',
])
@stop
