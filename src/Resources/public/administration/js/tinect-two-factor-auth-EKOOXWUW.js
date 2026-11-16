(()=>{var O=Object.defineProperty;var r=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var a=(i,e)=>{for(var t in e)O(i,t,{get:e[t],enumerable:!0})};var w,f=r(()=>{w=`{% block rl_user_otp_user_card %}
    <mt-card
        :title="$tc('tinect-2fa.settings.user-detail.title')"
        :is-loading="isLoading || isLoading2Fa"
    >
        <mt-banner
            v-if="oneTimePasswordError.length > 0 && !generatedSecretUrl"
            variant="critical"
            :title="$tc('tinect-2fa.settings.user-detail.generating.error-title')"
            :showIcon="true"
        >
            {{ oneTimePasswordError }}
        </mt-banner>
        <div v-if="enabled">
            <mt-banner
                variant="positive"
                :title="$tc('tinect-2fa.settings.user-detail.enabled.title')"
                :showIcon="true"
                :closable="false"
            >
                {{ $tc('tinect-2fa.settings.user-detail.enabled.description') }}
            </mt-banner>
            <mt-button
                variant="critical"
                class="tinect-user-otp__action"
                @click="disable2FA"
            >
                {{ $tc('tinect-2fa.settings.user-detail.enabled.disable') }}
            </mt-button>
        </div>
        <div v-else-if="!generatedSecretUrl">
            <mt-banner
                variant="attention"
                :title="$tc('tinect-2fa.settings.user-detail.not-enabled.title')"
                :showIcon="true"
                :closable="false"
            >
                {{ $tc('tinect-2fa.settings.user-detail.not-enabled.description') }}
            </mt-banner>
            <mt-button
                variant="primary"
                class="tinect-user-otp__action"
                @click="generateSecret"
            >
                {{ $tc('tinect-2fa.settings.user-detail.not-enabled.get-started') }}
            </mt-button>
        </div>
        <div v-else-if="generatedSecretUrl">
            <sw-container columns="1fr 1fr">
                <div class="tinect-2fa-qr-code">
                    <img
                        class="tinect-2fa-qr-code--image"
                        :src="generatedSecretUrl"
                        :alt="generatedSecret"
                    />
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
                        :label="$tc('tinect-2fa.one-time-password')"
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
    
        <sw-verify-user-modal
            v-if="pendingAction"
            @verified="onVerified"
            @close="onCloseVerifyModal"
        />
    </mt-card>
{% endblock %}
`});var v=r(()=>{});var b={};a(b,{default:()=>G});var G,k=r(()=>{f();v();G={template:w,inject:["tinect2faService"],props:{user:{type:Object,required:!0},isLoading:{type:Boolean,required:!1,default:!1}},data(){return{isLoading2Fa:!1,enabled:!1,generatedSecret:null,generatedSecretUrl:null,oneTimePassword:"",oneTimePasswordError:"",pendingAction:null}},watch:{"user.id":{immediate:!0,handler(){this.loadStatus()}}},methods:{loadStatus(){this.enabled=!1,this.generatedSecret=null,this.generatedSecretUrl=null,this.user?.id&&(this.isLoading2Fa=!0,this.tinect2faService.getUserStatus(this.user.id).then(i=>{this.enabled=i.enabled===!0}).finally(()=>{this.isLoading2Fa=!1}))},generateSecret(){this.isLoading2Fa=!0,this.tinect2faService.getSecret(this.user.username).then(i=>{this.generatedSecret=i.secret,this.generatedSecretUrl=i.qrUrl}).finally(()=>{this.isLoading2Fa=!1})},validateAndSaveOneTimePassword(){this.oneTimePasswordError="",this.pendingAction="save"},disable2FA(){this.pendingAction="remove"},onVerified(){let i=this.pendingAction;this.pendingAction=null,this.isLoading2Fa=!0,(i==="save"?this.tinect2faService.saveUserSecret(this.user.id,this.generatedSecret,this.oneTimePassword):this.tinect2faService.removeUserSecret(this.user.id)).then(()=>{this.enabled=i==="save",this.generatedSecret=null,this.generatedSecretUrl=null,this.oneTimePassword=""}).catch(t=>{this.oneTimePasswordError=t?.response?.data?.error??t?.response?.data?.errors?.[0]?.detail??t.message}).finally(()=>{this.isLoading2Fa=!1})},onCloseVerifyModal(){this.pendingAction=null}}}});var A,S=r(()=>{A=`{% block sw_login_login %}
    <div v-if="!showOtpForm">
        {% parent %}
    </div>

    <form
        v-else
        class="sw-login-login sw-login-login-otp"
        @submit.prevent="loginUserWithPasswordAndOtp"
    >
        <div class="sw-login__heading">
            <h1 class="sw-login__content-headline">
                {{ $tc('sw-login.index.headlineForm') }}
            </h1>
        </div>

        <mt-text-field
            v-model="otp"
            v-autofocus
            name="tinect-2fa-otp"
            :label="$tc('tinect-2fa.one-time-password')"
            autocomplete="one-time-code"
            inputmode="numeric"
            required
        />

        <div class="sw-login__submit">
            <mt-button
                :disabled="otp.length !== 6 || password.length <= 0 || username.length <= 0"
                class="sw-login__login-action"
                variant="primary"
                size="default"
                :block="true"
                type="submit"
            >
                {{ $tc('sw-login.index.buttonLogin') }}
            </mt-button>
        </div>
    </form>
{% endblock %}
`});var _={};a(_,{default:()=>N});var K,M,N,F=r(()=>{S();({Context:K,Application:M}=Shopware),N={template:A,emits:["is-loading","is-not-loading"],data(){return{rememberOtpPassword:"",showOtpForm:!1,otp:""}},methods:{loginUserWithPasswordAndOtp(){return this.$emit("is-loading"),this.loginWithOtp(this.username,this.password,this.otp).then(()=>{this.handleLoginSuccess(),this.$emit("is-not-loading")}).catch(i=>{this.password="",this.otp="",this.showOtpForm=!1,this.handleLoginError(i),this.$emit("is-not-loading")})},loginWithOtp(i,e,t){return M.getContainer("init").httpClient.post("/oauth/token",{grant_type:"password",client_id:"administration",scopes:"write",username:i,password:e,tinect_2fa_otp:t},{baseURL:K.api.apiPath}).then(n=>{let c=this.loginService.setBearerAuthentication({access:n.data.access_token,refresh:n.data.refresh_token,expiry:n.data.expires_in});return window.localStorage.setItem("redirectFromLogin","true"),c})},loginUserWithPassword(){this.rememberOtpPassword=this.password,this.$super("loginUserWithPassword")},handleLoginError(i){if(i?.response?.data?.errors?.[0]?.detail!=="request-otp"){this.$super("handleLoginError",i);return}this.password=this.rememberOtpPassword,this.showOtpForm=!0}}}});var C,y=r(()=>{C=`{% block sw_profile_index_general_password %}
    <tinect-user-otp
        v-if="showPasswordChangeCard && user"
        :user="user"
        :isLoading="isUserLoading"
    ></tinect-user-otp>

    {% parent() %}
{% endblock %}
`});var z={};a(z,{default:()=>Y});var Y,P=r(()=>{y();Y={template:C}});var L,U=r(()=>{L=`{% block sw_setting_user_detail_card_integrations %}
    <tinect-user-otp
        v-if="user && !user._isNew"
        :user="user"
        :isLoading="isLoading"
    ></tinect-user-otp>

    {% parent() %}
{% endblock %}
`});var $={};a($,{default:()=>X});var X,T=r(()=>{U();X={template:L}});var j,x=r(()=>{j=`{% block sw_customer_base_metadata_active %}
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
                @click="disable2FA"
            >
                {{ $tc('tinect-2fa.settings.user-detail.enabled.disable') }}
            </mt-button>
        </dd>
        {% endblock %}
    </sw-description-list>
{% endblock %}`});var q={};a(q,{default:()=>te});var te,E=r(()=>{x();te={template:j,inject:["tinect2faService"],data(){return{twoFactorAuthenticationActive:!1}},methods:{createdComponent(){this.$super("createdComponent"),this.twoFactorAuthenticationActive=!1,this.customer?.id&&this.tinect2faService.getCustomerStatus(this.customer.id).then(i=>{this.twoFactorAuthenticationActive=i.enabled===!0}).catch(()=>{})},disable2FA(){this.tinect2faService.removeCustomerSecret(this.customer.id).then(()=>{this.twoFactorAuthenticationActive=!1})}}}});var u={"tinect-2fa":{settings:{"user-detail":{title:"Two factor authentication",enabled:{title:"Two factor authentication is enabled",description:"Congrats! You're secure! To disable 2FA for your account, click the button below.",disable:"Disable 2FA"},"not-enabled":{title:"Two factor authentication is not enabled",description:"Two factor authentication is not enabled for your account. Click the button below to set it up.","get-started":"Click here to get started"},generating:{"scan-code":"Scan the code on the left with your 2FA app.",description:"Fill in your One Time Password and click 'Validate & enable' to check the code and enable 2FA for your admin account.","error-title":"Something went wrong","validate-save":"Validate & save"}}},"one-time-password":"One-time password"}};var p={"tinect-2fa":{settings:{"user-detail":{title:"Zwei-Faktor-Authentifizierung",enabled:{title:"Zwei-Faktor-Authentifizierung ist aktiv",description:"Gl\xFCckwunsch, dein Account ist sicher! Um 2FA zu deaktivieren klicke auf den nachstehenden Button.",disable:"2FA deaktivieren"},"not-enabled":{title:"Zwei-Faktor-Authentifizierung ist inaktiv",description:"Zwei-Faktor-Authentifizierung ist inaktiv! Zum Aktivieren klicke auf den nachstehenden Button.","get-started":"2FA aktivieren"},generating:{"scan-code":"Scanne den Code in deiner 2FA-App.",description:"Trage dein Einmal-Passwort ein und klicke auf Validieren & Speichern um 2FA f\xFCr deinen Account zu aktivieren.","error-title":"Es ist ein Fehler aufgetreten","validate-save":"Validieren & Speichern"}}},"one-time-password":"Einmal-Passwort"}};var h={"tinect-2fa":{settings:{"user-detail":{title:"Authentification \xE0 deux facteurs (2FA)",enabled:{title:"L'authentification \xE0 deux facteurs est activ\xE9e",description:"F\xE9licitations! Vous \xEAtes en s\xE9curit\xE9! Pour d\xE9sactiver 2FA pour votre compte, cliquez sur le bouton ci-dessous.",disable:"D\xE9sactiver 2FA"},"not-enabled":{title:"L'authentification \xE0 deux facteurs n'est pas activ\xE9e",description:"L'authentification \xE0 deux facteurs n'est pas activ\xE9e pour votre compte. Cliquez sur le bouton ci-dessous pour le configurer.","get-started":"Cliquez ici pour commencer"},generating:{"scan-code":"Scannez le code \xE0 gauche avec votre application 2FA.",description:"Entrez votre mot de passe \xE0 usage unique (OTP) et cliquez sur 'Valider & activer' pour v\xE9rifier le code et activer 2FA pour votre compte administrateur.","error-title":"Un probl\xE8me est survenu","validate-save":"Valider & sauvegarder"}}},"one-time-password":"Mot de passe \xE0 usage unique"}};var m={"tinect-2fa":{settings:{"user-detail":{title:"Twee-factorauthenticatie",enabled:{title:"Twee-factorauthenticatie is ingeschakeld",description:"Proficiat! Je account is veilig! Klik op onderstaande knop om 2FA uit te zetten.",disable:"Zet 2FA uit"},"not-enabled":{title:"Twee-factorauthenticatie is uitgeschakeld",description:"Twee-factorauthenticatie is niet actief voor jouw account. Klik op onderstaande knop om 2FA aan te zetten.","get-started":"2FA instellen"},generating:{"scan-code":"Scan de code links met jouw 2FA app.",description:"Vul je One Time Password token in, en klik op 'Valideer & sla op' om de token na te kijken. Als de code correct is wordt 2FA aangezet voor jouw account.","error-title":"Er ging iets mis.","validate-save":"Valideer & sla op"}}},"one-time-password":"Eenmalig wachtwoord"}};var g={"tinect-2fa":{settings:{"user-detail":{title:"Uwierzytelnianie dwusk\u0142adnikowe",enabled:{title:"Uwierzytelnianie dwusk\u0142adnikowe jest w\u0142\u0105czone",description:"Gratulacje! Jeste\u015B bezpieczny! Aby wy\u0142\u0105czy\u0107 2FA dla swojego konta, kliknij przycisk poni\u017Cej.",disable:"Wy\u0142\u0105cz 2FA"},"not-enabled":{title:"Uwierzytelnianie dwusk\u0142adnikowe nie jest w\u0142\u0105czone",description:"Uwierzytelnianie dwusk\u0142adnikowe nie jest w\u0142\u0105czone dla Twojego konta. Kliknij przycisk poni\u017Cej, aby je skonfigurowa\u0107.","get-started":"Kliknij, aby rozpocz\u0105\u0107"},generating:{"scan-code":"Zeskanuj kod po lewej stronie za pomoc\u0105 aplikacji 2FA.",description:"Wprowad\u017A swoje has\u0142o jednorazowe i kliknij \u201EZweryfikuj i w\u0142\u0105cz\u201D, aby sprawdzi\u0107 kod i w\u0142\u0105czy\u0107 2FA dla swojego konta administratora.","error-title":"Co\u015B posz\u0142o nie tak","validate-save":"Zweryfikuj i zapisz"}}},"one-time-password":"Has\u0142o jednorazowe"}};var{ApiService:o}=Shopware.Classes,s=class extends o{constructor(e,t,n="_action/tinect-2fa"){super(e,t,n)}getSecret(e){let t=`${this.getApiBasePath()}/generate-secret`;return this.httpClient.get(t,{params:{holder:e},headers:this.getBasicHeaders()}).then(n=>o.handleResponse(n))}getUserStatus(e){return this.sendRequest("get",`user/${e}/status`)}saveUserSecret(e,t,n){return this.sendRequest("post",`user/${e}/secret`,{secret:t,code:n})}removeUserSecret(e){return this.sendRequest("delete",`user/${e}/secret`)}getCustomerStatus(e){return this.sendRequest("get",`customer/${e}/status`)}removeCustomerSecret(e){return this.sendRequest("delete",`customer/${e}/secret`)}sendRequest(e,t,n=void 0){return this.httpClient.request({method:e,url:`${this.getApiBasePath()}/${t}`,data:n,headers:this.getBasicHeaders()}).then(c=>o.handleResponse(c))}getUserVerificationTicket(){let e=`${this.getApiBasePath()}/user-verification-ticket`;return this.httpClient.post(e,{},{headers:this.getBasicHeaders()}).then(t=>o.handleResponse(t).ticket)}};var{Application:d,Context:I}=Shopware;d.addServiceProvider("tinect2faService",i=>{let e=d.getContainer("init");return new s(e.httpClient,i.loginService)});var l=Shopware.Service("loginService");l.verifyUserByUsername=(i,e)=>Shopware.Service("tinect2faService").getUserVerificationTicket().catch(()=>"").then(t=>d.getContainer("init").httpClient.post("/oauth/token",{grant_type:"password",client_id:"administration",scope:"user-verified",username:i,password:e,tinect_2fa_ticket:t},{baseURL:I.api.apiPath})).then(t=>({access:t.data.access_token,expiry:t.data.expires_in,refresh:t.data.refresh_token}));l.verifyUserToken=i=>{let e=Shopware.Store.get("session").currentUser?.username??"";return l.verifyUserByUsername(e,i).then(({access:t})=>{if(typeof t=="string")return t;throw new Error("access Token should be of type String")})};Shopware.Component.register("tinect-user-otp",()=>Promise.resolve().then(()=>(k(),b)));Shopware.Component.override("sw-login-login",()=>Promise.resolve().then(()=>(F(),_)));Shopware.Component.getComponentRegistry().has("sw-profile-index-general")&&Shopware.Component.override("sw-profile-index-general",()=>Promise.resolve().then(()=>(P(),z)));Shopware.Component.getComponentRegistry().has("sw-users-permissions-user-detail")&&Shopware.Component.override("sw-users-permissions-user-detail",()=>Promise.resolve().then(()=>(T(),$)));Shopware.Component.getComponentRegistry().has("sw-customer-base-info")&&Shopware.Component.override("sw-customer-base-info",()=>Promise.resolve().then(()=>(E(),q)));Shopware.Locale.extend("de-DE",p);Shopware.Locale.extend("en-GB",u);Shopware.Locale.extend("fr-FR",h);Shopware.Locale.extend("nl-NL",m);Shopware.Locale.extend("pl-PL",g);})();
