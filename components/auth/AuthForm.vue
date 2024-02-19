<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
    <div class="px-4py-8 shadow-mdsm:rounded-lgsm:px-10">
      <form 
        class="space-y-6" 
        @submit.prevent="handleSubmit"
      >
        <Input
          v-if="variant === 'REGISTER'"
          v-model="formData.name" 
          placeholder="Имя"
          name="name"
          @change="v$.name.$touch()"
          :error='v$.name.$error'
        />
          
        <Input 
          v-model="formData.email" 
          placeholder="Email"
          name="email"
          @change="v$.email.$touch()"
          :error='v$.email.$error' 
        />
        <Input 
          v-model="formData.password" 
          placeholder="Пароль"
          name="password"
          @change="v$.password.$touch()"
          :error='v$.password.$error' 
        />
        <div>
          <Button type="submit" variant="primary" class="w-full" :disabled="isLoading">
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
          <AuthSocialButton @click="socialAction('github')" :button-auth-type="'GITHUB'" />
          <AuthSocialButton @click="socialAction('google')" :button-auth-type="'GOOGLE'" />
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
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { toast } from 'vue3-toastify';
import type { ToastOptions } from 'vue3-toastify/dist/index.d.ts'

import Input from '../Input.vue';
import { Button } from '@/components/ui/button'
import AuthSocialButton from './AuthSocialButton.vue';

type Variant = 'LOGIN' | 'REGISTER'

const formData = reactive({
  name: '',
  email: '',
  password: '',
});
const variant = ref<Variant>('LOGIN')
const isLoading = ref(false);

// --------- Toggle Form Variants ---------- //

const toggleVariant = () => {
  // Reset Form
  v$.value.$reset()

  if (variant.value == 'LOGIN') {
      variant.value = 'REGISTER'
  } else {
      variant.value = 'LOGIN'
  }
}
// --------- Toggle Form Variants ---------- //


// --------- Form Validation and Submiting ---------- //

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

async function handleSubmit() {

  if (variant.value === 'REGISTER') {
    v$.value.name.$touch()
    v$.value.email.$touch()
    v$.value.password.$touch()

    const isValidRegisterForm = !v$.value.name.$error && !v$.value.email.$error && !v$.value.password.$error

    if (!isValidRegisterForm) {
      return toast.error('Заполните форму!', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      })
    }

    try {
      isLoading.value = true;
      const { data, error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });
      if (error.value) {
        toast.error(error.value.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      });
      }
      if (data.value) {
        toast.success('Пользователь удачно зарегистрирован!', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      })
      }
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  } else if (variant.value === 'LOGIN') {
    v$.value.name.$touch()
    v$.value.email.$touch()

    const isValidLoginForm = !v$.value.email.$error && !v$.value.password.$error

    if (!isValidLoginForm) {
      return toast.error('Заполните форму!', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      })
    } 

    try {
      isLoading.value = true;

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok && !result.error) {
        toast.success('Вы удачно авторизовались!', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      })
      } else {
        toast.error('Ощибка авторизации', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      });
      }
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  }
}
// --------- Form Validation and Submiting ---------- //


// --------- Social Auth action ---------- //
const { signIn } = useAuth();

const socialAction = async (action: string) => {
  await signIn(action, { redirect: false });
};
// --------- Social Auth action ---------- //

</script>
