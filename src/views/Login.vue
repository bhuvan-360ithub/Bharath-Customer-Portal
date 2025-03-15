<template>
    <div class="flex flex-col md:flex-row h-screen items-center justify-center">
      <div class="w-full md:w-1/2 p-6 hidden md:block">
        <img src="/src/assets/login.png" alt="Login Image" class="w-full h-full rounded-lg object-cover" />
      </div>
      <div class="w-full md:w-1/2 p-10">
        <div class="flex flex-col items-center">
          <div class="mb-6">
            <img src="/src/assets/logo.png" alt="Logo" class="w-32 h-auto" />
          </div>
  
          <transition name="smooth-slide" mode="out-in">
            <div v-if="isLogin" key="login" class="w-full max-w-md">
              <h2 class="text-2xl font-semibold text-left">Welcome Back</h2>
              <p class="text-gray-600 text-left mb-4">Enter your credentials to access your account.</p>
  
              <div class="relative w-full">
                <input type="email" v-model="email" @input="validateEmail" class="input-field" required />
                <label class="input-label" :class="{ 'active': email }">Email</label>
              </div>
  
              <div class="relative w-full mt-3">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" class="input-field" required />
                <label class="input-label" :class="{ 'active': password }">Password</label>
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="eye-icon" @click="togglePassword"></i>
              </div>
  
              <button @click="login" :disabled="!isValidLogin" class="btn" :class="{'bg-gray-400': !isValidLogin}">Sign In</button>
              <p class="mt-4 text-gray-600">Don't have an account? 
                <span @click="toggleForm" class="text-blue-600 cursor-pointer">Sign Up</span>
              </p>
            </div>
  
            <div v-else key="signup" class="w-full max-w-md">
              <h2 class="text-2xl font-semibold text-left">Sign Up</h2>
              <p class="text-gray-600 text-left mb-4">Join us by creating a new account.</p>
  
              <div class="flex gap-3">
                <div class="relative w-1/2">
                  <input type="text" v-model="firstName" class="input-field" required />
                  <label class="input-label" :class="{ 'active': firstName }">First Name</label>
                </div>
                <div class="relative w-1/2">
                  <input type="text" v-model="lastName" class="input-field" required />
                  <label class="input-label" :class="{ 'active': lastName }">Last Name</label>
                </div>
              </div>
  
              <div class="relative w-full mt-3">
                <input type="email" v-model="signupEmail" @input="validateSignupEmail" class="input-field" required />
                <label class="input-label" :class="{ 'active': signupEmail }">Email</label>
              </div>
  
              <div class="relative w-full mt-3">
                <input type="text" v-model="mobile" @input="validateMobile" class="input-field" required />
                <label class="input-label" :class="{ 'active': mobile }">Mobile Number</label>
              </div>
  
              <div class="relative w-full mt-3">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" class="input-field" required />
                <label class="input-label" :class="{ 'active': password }">Password</label>
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="eye-icon" @click="togglePassword"></i>
              </div>
  
              <button @click="signup" :disabled="!isValidSignup" class="btn" :class="{'bg-gray-400': !isValidSignup}">Sign Up</button>
              <p class="mt-4 text-gray-600">Have an account? 
                <span @click="toggleForm" class="text-blue-600 cursor-pointer">Login</span>
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLogin: true,
        email: '',
        signupEmail: '',
        password: '',
        showPassword: false,
        firstName: '',
        lastName: '',
        mobile: '',
        isSignupValid: false,
        isLoginValid: false
      };
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
      },
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      login() {
        alert('Logging in...');
      },
      signup() {
        alert('Signing up...');
      },
      validateEmail() {
        // Simple email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.isLoginValid = emailRegex.test(this.email);
      },
      validateSignupEmail() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.isSignupValid = emailRegex.test(this.signupEmail) && this.firstName && this.lastName && this.mobile.length === 10 && this.password.length > 0;
      },
      validateMobile(event) {
        // Allow only numbers and ensure exactly 10 digits
        const mobileRegex = /^[0-9]{0,10}$/; // Allow up to 10 digits
        if (!mobileRegex.test(this.mobile)) {
          this.mobile = this.mobile.slice(0, 10); // Limit to 10 digits
        }
      }
    },
    computed: {
      isValidLogin() {
        return this.isLoginValid && this.password.length > 0;
      },
      isValidSignup() {
        return this.isSignupValid;
      }
    },
    watch: {
      firstName() {
        this.validateSignupEmail();
      },
      lastName() {
        this.validateSignupEmail();
      },
      mobile() {
        this.validateSignupEmail();
      },
      password() {
        this.validateSignupEmail();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Smooth Slide Transition */
  .smooth-slide-enter-active, .smooth-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease-in-out;
  }
  .smooth-slide-enter, .smooth-slide-leave-to {
    opacity: 0;
    transform: translateX(-10%);
  }
  
  /* Eye Icon */
  .eye-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 1.2rem;
    color: #777;
    transition: color 0.3s ease;
  }
  .eye-icon:hover {
    color: #000;
  }
  
  /* Input Styling */
  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border 0.3s ease;
    background: white;
    position: relative;
  }
  .input-field:focus {
    border-color: #007bff;
  }
  
  .input-label {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #777;
    transition: all 0.3s ease;
    background: white;
    padding: 0 5px;
    pointer-events: none;
  }
  
  .input-field:focus ~ .input-label,
  .input-label.active {
    top: -2px;
    font-size: 12px;
    color: #007bff;
    padding: 0 5px;
  }
  
  /* Button */
  .btn {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background: #007bff;
    color: white;
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  .btn:hover {
    background: #0056b3;
  }
  
  .bg-gray-400 {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  