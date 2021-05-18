<template>
  <div>
    <form v-if="!isSubmitted" @submit.prevent="submit" novalidate>
      <div class="form-group">
        <label for="full_name">{{ $t('form.full_name') }} *</label>
        <input type="text" class="form-control" id="full_name" v-model.lazy.trim="form.full_name" @blur="onFieldBlur('full_name')" v-bind:class="getFieldClasses('full_name')">
        <div v-if="isErrorField('full_name')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.full_name') }) }}</div>
      </div>
     
      <div class="form-group">
        <label for="email">{{ $t('form.email') }} *</label>
        <input type="email" class="form-control" id="email" v-model.lazy.trim="form.email" @blur="onFieldBlur('email')" v-bind:class="getFieldClasses('email')">
        <div v-if="isErrorField('email')" class="invalid-feedback">{{ $t('error.fieldInvalid', { field: $t('form.email') }) }}</div>
      </div>

       <div class="form-group">
        <label for="phone">{{ $t('form.phone') }} *</label>
        <input type="text" class="form-control" id="phone" v-model.lazy.trim="form.phone" @blur="onFieldBlur('phone')" v-bind:class="getFieldClasses('phone')">
        <div v-if="isErrorField('phone')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.phone') }) }}</div>
      </div>

      
 <div class="form-group">
        <label for="amount">{{ $t('form.amount') }} *</label>
        <input type="text" class="form-control" id="phone" v-model.lazy.trim="form.amount" @blur="onFieldBlur('amount')" v-bind:class="getFieldClasses('amount')">
        <div v-if="isErrorField('amount')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.amount') }) }}</div>
      </div>

<div class="form-group">
        <label for="payment_date">{{ $t('form.payment_date') }} *</label>
        <input type="text" class="form-control" id="payment_date" v-model.lazy.trim="form.payment_date" @blur="onFieldBlur('payment_date')" v-bind:class="getFieldClasses('payment_date')">
        <div v-if="isErrorField('payment_date')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.payment_date') }) }}</div>
      </div>

      <div class="form-group">
        <label for="donation_type">{{ $t('form.donation_type') }} *</label>
        <select id="donation_type" class="form-control" v-model="form.donation_type" @blur="onFieldBlur('donation_type')" v-bind:class="getFieldClasses('donation_type')">
            <option v-for="type in types" v-bind:key="type.value" v-bind:value="type.value">{{ $t(type.label) }}</option>
        </select>
        <div v-if="isErrorField('donation_type')" class="invalid-feedback">{{ $t('form.donation_type') }}</div>
      </div>


<div class="form-group">
        <label for="city">{{ $t('form.city') }} *</label>
        <input type="text" class="form-control" id="city" v-model.lazy.trim="form.city" @blur="onFieldBlur('city')" v-bind:class="getFieldClasses('city')">
        <div v-if="isErrorField('city')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.city') }) }}</div>
      </div>


      <div class="form-group">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="terms" v-model.lazy.trim="form.terms" @change="onFieldBlur('terms')" v-bind:class="getFieldClasses('terms')">
          <label class="form-check-label" for="terms">{{ $t('form.terms') }} *</label>
        </div>
      </div>
      <div class="alert alert-danger" v-if="isError">
        <p class="mb-0">
          <strong>{{ $t(errorHeader) }}</strong>
        </p>
        <ul class="mb-0 pl-3" v-if="errors.length > 0">
          <li v-for="error in errors" v-bind:key="error.field">
            <span v-if="error.field">{{ $t('form.'+error.field) }}<span v-if="error.message">: {{ $t(error.message) }}</span></span>
            <span v-else-if="error.message">{{ $t(error.message) }}</span>
          </li>
        </ul>
      </div>





      <div class="form-group">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          <span v-if="submitting">{{ $t('form.submitting' ) }} <img src="../loader.svg" /></span>
          <span v-else>{{ $t('form.submit' ) }}</span>
        </button>
      </div>
    </form>
    <div v-else>
      <div class="alert alert-success">
        <strong>{{ $t('form.submitted' ) }}</strong>
      </div>
      <div class="alert alert-info">
        <p><strong>{{ $t('form.sentInfo' ) }}</strong></p>
        <pre>
            {{form}}
        </pre>
      </div>
      <p class="text-center">
        <a href="#" class="btn btn-secondary" @click.prevent="reload()">{{ $t('form.return' ) }}</a>
      </p>
    </div>
  </div>
</template>

<script src="form.js"></script>
<style src="form.scss" lang="scss" scoped></style>
<script>
import FormMixin from 'FormMixin';

export default {
  mixins: [ FormMixin ],

  data() {
    return {
      'action': '/api/offering',
    }
  }
}
</script>