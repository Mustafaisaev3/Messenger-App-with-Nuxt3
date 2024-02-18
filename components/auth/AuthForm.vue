<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
    <div class="px-4py-8 shadow-mdsm:rounded-lgsm:px-10">
      <form 
        class="space-y-6" 
      >
        <Input
          v-if="variant === 'REGISTER'"
          v-model="formData.name" 
          placeholder="Имя"
          name="name"
          @change="v$.name.$touch"
          :error='v$.name.$error'
        />
          
        <Input 
          v-model="formData.email" 
          placeholder="Email"
          name="email"
          @change="v$.email.$touch"
          :error='v$.email.$error' 
        />
        <Input 
          v-model="formData.password" 
          placeholder="Пароль"
          name="password"
          @change="v$.password.$touch"
          :error='v$.password.$error' 
        />
        <div>
          <Button type="button" variant="primary" class="w-full" @click="handleClick">
            {{ variant === 'LOGIN' ? 'Войти' : 'Зарегистрироваться' }}
          </Button>
        </div>
      </form>  
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-[#1b2439] px-2 text-gray-300">
              Или продолжите с
            </span>
          </div>
        </div>  
        <div class="mt-6 flex gap-2">
          <AuthSocialButton :button-auth-type="'GITHUB'" />
          <AuthSocialButton :button-auth-type="'GOOGLE'" />
        </div>
      </div>
      <div class="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          {{ variant === 'LOGIN' ? 'Еще не зарегистрированны?' : 'У вас уже есть аккаунт?' }}
        </div>
        <div 
          @click='toggleVariant'
          class="underline cursor-pointer"
        >
          {{ variant === 'LOGIN' ? 'Зарегистрироваться' : 'Войти' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
// import Input from '../ui/input/Input.vue';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import Input from '../Input.vue';
import { Button } from '@/components/ui/button'
import AuthSocialButton from './AuthSocialButton.vue';

// --------- Toggle Form Variants ---------- //
type Variant = 'LOGIN' | 'REGISTER'

const variant = ref<Variant>('LOGIN')

const toggleVariant = () => {
    if (variant.value == 'LOGIN') {
        variant.value = 'REGISTER'
    } else {
        variant.value = 'LOGIN'
    }
}
// --------- Toggle Form Variants ---------- //


// --------- Form Validation ---------- //
const formData = reactive({
  name: '',
  email: '',
  password: '',
});

const handleClick = () => {
  console.log(formData)
  console.log(v$.value.email.$error)
  console.log(v$.value.password.$error)
}

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Введите ваш Email', required),
      minLength: minLength(2),
    },
    email: {
      required: helpers.withMessage('Введите ваш Email', required),
      email: helpers.withMessage('Некорректный Email', email),
    },
    password: {
      required: helpers.withMessage('Введите ваш Пароль', required),
      minLength: minLength(6),
    }
  };
});

const v$ = useVuelidate(rules, formData);
// --------- Form Validation ---------- //

</script>
