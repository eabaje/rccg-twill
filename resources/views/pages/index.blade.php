@extends('main')

// @section('title', '| About')

@section('content')
       @include('includes.welcome' )

		@include('includes.about' )

		@include('includes.program' )

		@include('includes.training' )

		@include('includes.mandate' )

		@include('includes.history' )

		@include('includes.feature' )

		@include('includes.church' )

		@include('includes.giving' )

		@include('includes.how' )

		@include('includes.contact' )

@endsection