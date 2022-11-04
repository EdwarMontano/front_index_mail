<template>   

    <a-row>
        <a-col :xs="{ span: 24}" :sm="{ span: 12 , offset:6 }">        
            
            <a-form
           
            :model="formState"
            name="basicLogin"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
           
            >
                <a-form-item label="email"  name="email" :rules="[{ required: true, whitespace:true ,type:'email',message: 'Ingresa tu correo electrónico valido' }]">
                    <a-input  placeholder="Ingrese email" v-model:value="formState.email" />
                </a-form-item>
                
                <a-form-item label="Password" name="password" :rules="[{ required: true, whitespace:true, min:6, message: 'Ingresa una contraseña con mínimo 6 carácteres ' }]">
                    <a-input-password  placeholder="Ingrese contraseña"  v-model:value="formState.password"/>
                </a-form-item> 
                
                
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser" >Ingresar</a-button>
                </a-form-item>
            </a-form>
        </a-col>     


    </a-row>
    
</template>

<script setup>
// import { computed } from "vue-demi"
import {reactive} from "vue"
import {useUserStore} from "../stores/user"

import { message } from "ant-design-vue";



const userStore= useUserStore()


const formState = reactive({
      email: 'chocoplot@gmail.com',
      password: '123456',
    });




const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await userStore.loginUser(formState.email, formState.password);
    if (res === "auth/wrong-password") {
        message.error("credenciales no válidas");
    }
};
    
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
    


</script>