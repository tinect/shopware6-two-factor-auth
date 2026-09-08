(()=>{var V=Object.defineProperty;var a=(e,t,i)=>()=>{if(i)throw i[0];try{return e&&(t=e(e=0)),t}catch(n){throw i=[n],n}};var s=(e,t)=>{for(var i in t)V(e,i,{get:t[i],enumerable:!0})};var w,g=a(()=>{w=`{% block rl_user_otp_user_card %}
<mt-card
    :title="$tc('tinect-2fa.settings.user-detail.title')"
    :is-loading="isLoading || isLoading2Fa"
>
    <div v-if="user && user.customFields && user.customFields.rl_2fa_secret">
        <mt-banner
            variant="positive"
            :title="$tc('tinect-2fa.settings.user-detail.enabled.title')"
            style="margin-bottom: 0;"
            :showIcon="true"
            :closable="false"
        >
            {{ $tc('tinect-2fa.settings.user-detail.enabled.description') }}
        </mt-banner>
        <mt-button
            variant="critical"
            class="mt-1"
            @click="disable2FA"
        >
            {{ $tc('tinect-2fa.settings.user-detail.enabled.disable') }}
        </mt-button>
    </div>
    <div v-else-if="!generatedSecretUrl">
        <mt-banner
            variant="attention"
            :title="$tc('tinect-2fa.settings.user-detail.not-enabled.title')"
            style="margin-bottom: 0;"
            :showIcon="true"
            :closable="false"
        >
            {{ $tc('tinect-2fa.settings.user-detail.not-enabled.description') }}
        </mt-banner>
        <mt-button
            variant="primary"
            class="mt-1"
            @click="generateSecret"
        >
            {{ $tc('tinect-2fa.settings.user-detail.not-enabled.get-started') }}
        </mt-button>
    </div>
    <div v-else-if="generatedSecretUrl">
        <sw-container columns="1fr 1fr">
            <div class="tinect-2fa-qr-code">
                <img :src="generatedSecretUrl"/>
                <span class="tinect-2fa-qr-code--secret">{{ generatedSecret }}</span>
            </div>
            <div>
                <b>
                    {{ $tc('tinect-2fa.settings.user-detail.generating.scan-code') }}
                </b>
                <br/>
                <br/>
                {{ $tc('tinect-2fa.settings.user-detail.generating.description') }}
                <br/>
                <br/>
                <mt-banner
                    variant="critical"
                    :title="$tc('tinect-2fa.settings.user-detail.generating.error-title')"
                    :showIcon="true"
                    v-if="oneTimePasswordError.length > 0"
                >
                        {{ oneTimePasswordError }}
                    </mt-banner>
                <mt-text-field
                    label="One-time Password"
                    :isInvalid="oneTimePasswordError.length > 0"
                    v-model="oneTimePassword"
                    autocomplete="one-time-code"
                />
                <mt-button
                    variant="primary"
                    @click="validateAndSaveOneTimePassword"
                >
                    {{ $tc('tinect-2fa.settings.user-detail.generating.validate-save') }}
                </mt-button>
            </div>
        </sw-container>
    </div>
</mt-card>
{% endblock %}`});var f=a(()=>{});var v={};s(v,{default:()=>G});var G,b=a(()=>{g();f();G={template:w,inject:["tinect2faService"],props:{user:{type:Object,required:!0},isLoading:{type:Boolean,required:!0},onSave:{type:Function,required:!0}},data(){return{httpClient:null,isLoading2Fa:!1,generatedSecret:null,generatedSecretUrl:null,oneTimePassword:"",oneTimePasswordError:""}},created(){this.syncService=Shopware.Service("syncService"),this.httpClient=this.syncService.httpClient},methods:{generateSecret(){this.isLoading2Fa=!0,this.tinect2faService.getSecret(this.user.username).then(e=>{this.isLoading2Fa=!1,this.generatedSecret=e.secret,this.generatedSecretUrl=e.qrUrl})},validateAndSaveOneTimePassword(){this.isLoading2Fa=!0,this.tinect2faService.validateSecret(this.generatedSecret,this.oneTimePassword).then(e=>{this.isLoading2Fa=!1,e.status==="OK"&&this.saveOneTimePassword()}).catch(e=>{this.isLoading2Fa=!1,this.oneTimePasswordError=e.response.data.error})},saveOneTimePassword(){this.user.customFields||(this.user.customFields={}),this.user.customFields.rl_2fa_secret=this.generatedSecret,this.onSave()},disable2FA(){this.user.customFields||(this.user.customFields={}),this.user.customFields.rl_2fa_secret="",this.onSave()}}}});var S,k=a(()=>{S=`{% block sw_login_login %}
<div v-if="!showOtpForm">
    {% parent() %}
</div>

<div v-else>
    <div class="sw-login-login sw-login-login-otp">
        <h2 class="sw-login__content-headline">
            {{ $tc('sw-login.index.headlineForm') }}
        </h2>
        <mt-text-field
            v-autofocus
            v-model="otp"
            label="One-time password"
            required
            autocomplete="one-time-code"
        >
            </mt-text-field>
        <div class="sw-login__submit">
            <mt-button
                :disabled="otp.length != 6 || password.length <= 0 || username.length <= 0"
                class="sw-login__login-action"
                variant="primary"
                @click="loginUserWithPasswordAndOtp"
            >
                {{ $tc('sw-login.index.buttonLogin') }}
            </mt-button>
        </div>
    </div>
</div>
{% endblock %}`});var F={};s(F,{default:()=>Y});var H,J,Y,_=a(()=>{k();({Context:H,Application:J}=Shopware),Y={template:S,data(){return{rememberOtpPassword:"",showOtpForm:!1,otp:""}},methods:{loginUserWithPasswordAndOtp(){return this.$emit("is-loading"),this.loginWithOtp(this.username,this.password,this.otp).then(()=>{this.handleLoginSuccess(),this.$emit("is-not-loading")}).catch(e=>{this.password="",this.otp="",this.showOtpForm=!1,this.handleLoginError(e),this.$emit("is-not-loading")})},loginWithOtp(e,t,i){return J.getContainer("init").httpClient.post("/oauth/token",{grant_type:"password",client_id:"administration",scopes:"write",username:e,password:t,tinect_2fa_otp:i},{baseURL:H.api.apiPath}).then(n=>{let r=this.loginService.setBearerAuthentication({access:n.data.access_token,refresh:n.data.refresh_token,expiry:n.data.expires_in});return window.localStorage.setItem("redirectFromLogin","true"),r})},loginUserWithPassword(){this.rememberOtpPassword=this.password,this.$super("loginUserWithPassword")},handleLoginError(e){if(e.response.data.errors[0].detail!=="request-otp"){this.$super("handleLoginError",e);return}this.password=this.rememberOtpPassword,this.showOtpForm=!0}}}});var y,A=a(()=>{y=`{% block sw_profile_index_router_view %}
<template v-if="isUserLoading">
    <sw-skeleton/>
    <sw-skeleton/>
</template>

<template v-else>
    <router-view v-slot="{ Component }">
        <component
            :is="Component"
            v-bind="{
                            user,
                            timezoneOptions,
                            languages,
                            newPassword,
                            newPasswordConfirm,
                            avatarMediaItem,
                            isUserLoading,
                            languageId,
                            isDisabled,
                            userRepository,
                        }"
            @new-password-change="onChangeNewPassword"
            @new-password-confirm-change="onChangeNewPasswordConfirm"
            @media-upload="setMediaItem"
            @media-remove="onUnlinkAvatar"
            @media-open="openMediaModal"
            @tinect-2fa-save="onSave"
        />
    </router-view>
</template>
{% endblock %}`});var z={};s(z,{default:()=>X});var X,C=a(()=>{A();X={template:y}});var L,P=a(()=>{L=`{% block sw_profile_index_general_password %}
<tinect-user-otp
    :user="user"
    :isLoading="isUserLoading"
    :onSave="onSave"
></tinect-user-otp>

{% parent() %}
{% endblock %}`});var x={};s(x,{default:()=>te});var te,j=a(()=>{P();te={template:L,methods:{onSave(){this.$emit("tinect-2fa-save")}}}});var $,T=a(()=>{$=`{% block sw_setting_user_detail_card_integrations %}
<tinect-user-otp
    :user="user"
    :isLoading="isLoading"
    :onSave="onSave"
></tinect-user-otp>

{% parent() %}
{% endblock %}`});var O={};s(O,{default:()=>ae});var ae,U=a(()=>{T();ae={template:$}});var E,q=a(()=>{E=`{% block sw_customer_base_metadata_active %}
{% parent() %}

<sw-description-list>
    {% block sw_customer_base_metadata_2fa_label %}
    <dt class="sw-customer-base-info__label">
        {{ $tc('tinect-2fa.settings.user-detail.title') }}
    </dt>
    {% endblock %}

    {% block sw_customer_base_metadata_2fa_content %}
    <dd
        v-if="!customerEditMode || !twoFactorAuthenticationActive"
        class="sw-customer-base__label-is-active"
    >
        {{ $tc('sw-customer.baseInfo.contentActive', twoFactorAuthenticationActive ? 1 : 2) }}
    </dd>
    {% endblock %}

    {% block sw_customer_base_metadata_2fa_editor %}
    <dd v-else>
        <mt-button
            if="twoFactorAuthenticationActive"
            @click="disable2FA"
        >
            {{ $tc('tinect-2fa.settings.user-detail.enabled.disable') }}
        </mt-button>
    </dd>
    {% endblock %}
</sw-description-list>
{% endblock %}`});var R={};s(R,{default:()=>se});var se,B=a(()=>{q();se={template:E,computed:{twoFactorAuthenticationActive(){return!!this.customer.customFields?.rl_2fa_secret}},methods:{disable2FA(){this.customer.customFields||(this.customer.customFields={}),this.customer.customFields.rl_2fa_secret=""}}}});var d={"tinect-2fa":{settings:{"user-detail":{title:"Two factor authentication",enabled:{title:"Two factor authentication is enabled",description:"Congrats! You're secure! To disable 2FA for your account, click the button below.",disable:"Disable 2FA"},"not-enabled":{title:"Two factor authentication is not enabled",description:"Two factor authentication is not enabled for your account. Click the button below to set it up.","get-started":"Click here to get started"},generating:{"scan-code":"Scan the code on the left with your 2FA app.",description:"Fill in your One Time Password and click 'Validate & enable' to check the code and enable 2FA for your admin account.","error-title":"Something went wrong","validate-save":"Validate & save"}}}}};var l={"tinect-2fa":{settings:{"user-detail":{title:"Zwei-Faktor-Authentifizierung",enabled:{title:"Zwei-Faktor-Authentifizierung ist aktiv",description:"Gl\xFCckwunsch, dein Account ist sicher! Um 2FA zu deaktivieren klicke auf den nachstehenden Button.",disable:"2FA deaktivieren"},"not-enabled":{title:"Zwei-Faktor-Authentifizierung ist inaktiv",description:"Zwei-Faktor-Authentifizierung ist inaktiv! Zum Aktivieren klicke auf den nachstehenden Button.","get-started":"2FA aktivieren"},generating:{"scan-code":"Scanne den Code in deiner 2FA-App.",description:"Trage dein Einmal-Passwort ein und klicke auf Validieren & Speichern um 2FA f\xFCr deinen Account zu aktivieren.","error-title":"Es ist ein Fehler aufgetreten","validate-save":"Validieren & Speichern"}}}}};var u={"tinect-2fa":{settings:{"user-detail":{title:"Authentification \xE0 deux facteurs (2FA)",enabled:{title:"L'authentification \xE0 deux facteurs est activ\xE9e",description:"F\xE9licitations! Vous \xEAtes en s\xE9curit\xE9! Pour d\xE9sactiver 2FA pour votre compte, cliquez sur le bouton ci-dessous.",disable:"D\xE9sactiver 2FA"},"not-enabled":{title:"L'authentification \xE0 deux facteurs n'est pas activ\xE9e",description:"L'authentification \xE0 deux facteurs n'est pas activ\xE9e pour votre compte. Cliquez sur le bouton ci-dessous pour le configurer.","get-started":"Cliquez ici pour commencer"},generating:{"scan-code":"Scannez le code \xE0 gauche avec votre application 2FA.",description:"Entrez votre mot de passe \xE0 usage unique (OTP) et cliquez sur 'Valider & activer' pour v\xE9rifier le code et activer 2FA pour votre compte administrateur.","error-title":"Un probl\xE8me est survenu","validate-save":"Valider & sauvegarder"}}}}};var p={"tinect-2fa":{settings:{"user-detail":{title:"Twee-factorauthenticatie",enabled:{title:"Twee-factorauthenticatie is ingeschakeld",description:"Proficiat! Je account is veilig! Klik op onderstaande knop om 2FA uit te zetten.",disable:"Zet 2FA uit"},"not-enabled":{title:"Twee-factorauthenticatie is uitgeschakeld",description:"Twee-factorauthenticatie is niet actief voor jouw account. Klik op onderstaande knop om 2FA aan te zetten.","get-started":"2FA instellen"},generating:{"scan-code":"Scan de code links met jouw 2FA app.",description:"Vul je One Time Password token in, en klik op 'Valideer & sla op' om de token na te kijken. Als de code correct is wordt 2FA aangezet voor jouw account.","error-title":"Er ging iets mis.","validate-save":"Valideer & sla op"}}}}};var m={"tinect-2fa":{settings:{"user-detail":{title:"Uwierzytelnianie dwusk\u0142adnikowe",enabled:{title:"Uwierzytelnianie dwusk\u0142adnikowe jest w\u0142\u0105czone",description:"Gratulacje! Jeste\u015B bezpieczny! Aby wy\u0142\u0105czy\u0107 2FA dla swojego konta, kliknij przycisk poni\u017Cej.",disable:"Wy\u0142\u0105cz 2FA"},"not-enabled":{title:"Uwierzytelnianie dwusk\u0142adnikowe nie jest w\u0142\u0105czone",description:"Uwierzytelnianie dwusk\u0142adnikowe nie jest w\u0142\u0105czone dla Twojego konta. Kliknij przycisk poni\u017Cej, aby je skonfigurowa\u0107.","get-started":"Kliknij, aby rozpocz\u0105\u0107"},generating:{"scan-code":"Zeskanuj kod po lewej stronie za pomoc\u0105 aplikacji 2FA.",description:"Wprowad\u017A swoje has\u0142o jednorazowe i kliknij \u201EZweryfikuj i w\u0142\u0105cz\u201D, aby sprawdzi\u0107 kod i w\u0142\u0105czy\u0107 2FA dla swojego konta administratora.","error-title":"Co\u015B posz\u0142o nie tak","validate-save":"Zweryfikuj i zapisz"}}}}};var{ApiService:c}=Shopware.Classes,o=class extends c{constructor(t,i,n="_action/tinect-2fa"){super(t,i,n)}getSecret(t){let i=`${this.getApiBasePath()}/generate-secret`;return this.httpClient.get(i,{params:{holder:t},headers:this.getBasicHeaders()}).then(n=>c.handleResponse(n))}validateSecret(t,i){let n=`${this.getApiBasePath()}/validate-secret`;return this.httpClient.post(n,{secret:t,code:i},{headers:this.getBasicHeaders()}).then(r=>c.handleResponse(r))}};var{Application:h}=Shopware;h.addServiceProvider("tinect2faService",e=>{let t=h.getContainer("init");return new o(t.httpClient,e.loginService)});Shopware.Component.register("tinect-user-otp",()=>Promise.resolve().then(()=>(b(),v)));Shopware.Component.override("sw-login-login",()=>Promise.resolve().then(()=>(_(),F)));Shopware.Component.getComponentRegistry().has("sw-profile-index")&&Shopware.Component.override("sw-profile-index",()=>Promise.resolve().then(()=>(C(),z)));Shopware.Component.getComponentRegistry().has("sw-profile-index-general")&&Shopware.Component.override("sw-profile-index-general",()=>Promise.resolve().then(()=>(j(),x)));Shopware.Component.getComponentRegistry().has("sw-users-permissions-user-detail")&&Shopware.Component.override("sw-users-permissions-user-detail",()=>Promise.resolve().then(()=>(U(),O)));Shopware.Component.getComponentRegistry().has("sw-customer-base-info")&&Shopware.Component.override("sw-customer-base-info",()=>Promise.resolve().then(()=>(B(),R)));Shopware.Locale.extend("de-DE",l);Shopware.Locale.extend("en-GB",d);Shopware.Locale.extend("fr-FR",u);Shopware.Locale.extend("nl-NL",p);Shopware.Locale.extend("pl-PL",m);})();
