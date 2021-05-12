@extends('twill::layouts.form')

@section('contentFields')
  

    @formField('select', [
    'name' => 'page',
    'label' => 'Content Type',
    'placeholder' => 'Select Content Type',
    'options' => [

        [
            'value' => 'welcome',
            'label' => 'Welcome Message'
        ],
        [
            'value' => 'about',
            'label' => 'About Us'
        ],
        [
            'value' => 'church',
            'label' => 'Church Info'
        ],
        [
            'value' => 'contact',
            'label' => 'Contact Info'
        ],
        [
            'value' => 'feature',
            'label' => 'Features'
        ],
        [
            'value' => 'giving',
            'label' => 'Online Giving'
        ],
        [
            'value' => 'history',
            'label' => 'History'
        ],
        [
            'value' => 'how',
            'label' => 'How it works'
        ],
        [
            'value' => 'program',
            'label' => 'Our Programs'
        ],
        [
            'value' => 'training',
            'label' => 'Training'
        ],
        [
            'value' => 'giving',
            'label' => 'Online Giving'
        ]
    ]
])


@formField('wysiwyg', [
    'name' => 'article',
    'label' => 'Sub-Page Content',
    'toolbarOptions' => [
      ['header' => [2, 3, 4, 5, 6, false]],
      'bold',
      'italic',
      'underline',
      'strike',
      ["script" => "super"],
      ["script" => "sub"],
      "blockquote",
      "code-block",
      ['list' => 'ordered'],
      ['list' => 'bullet'],
      ['indent' => '-1'],
      ['indent' => '+1'],
      ["align" => []],
      ["direction" => "rtl"],
      'link',
      "clean",
    ],
    'placeholder' => 'Page Content',
    
    'editSource' => true,
    'note' => 'Fill Page Content',
 ])




@formField('medias', [
    'name' => 'picture',
    'label' => 'Picture',
    'max' => 5,
    'fieldNote' => 'Optimise Image before upload'
])



@stop
