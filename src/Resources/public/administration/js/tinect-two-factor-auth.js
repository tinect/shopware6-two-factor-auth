(()=>{var ae=Object.defineProperty;var i=(e,t,a)=>()=>{if(a)throw a[0];try{return e&&(t=e(e=0)),t}catch(r){throw a=[r],r}};var n=(e,t)=>{for(var a in t)ae(e,a,{get:t[a],enumerable:!0})};var y,v=i(()=>{y=`{% block tinect_2fa_widget_summary %}
<div class="tinect-2fa-widget-summary">
    <sw-loader v-if="isLoading" />
    <p
        v-else-if="hasError"
        class="tinect-2fa-widget-summary__empty"
    >
        {{ $t('tinect-2fa.dashboard.loadError') }}
    </p>
    <dl
        v-else-if="summary"
        class="tinect-2fa-widget-summary__tiles"
    >
        <div
            v-for="tile in tiles"
            :key="tile.key"
            class="tinect-2fa-widget-summary__tile"
            :class="\`tinect-2fa-widget-summary__tile--\${tile.key}\`"
        >
            <dt class="tinect-2fa-widget-summary__label">
                {{ tile.label }}
            </dt>
            <dd class="tinect-2fa-widget-summary__value">
                {{ tile.value }}
            </dd>
            <dd
                v-if="tile.hint"
                class="tinect-2fa-widget-summary__hint"
            >
                {{ tile.hint }}
            </dd>
        </div>
    </dl>
</div>
{% endblock %}
`});var k=i(()=>{});var A={};n(A,{default:()=>ce});var ce,_=i(()=>{v();k();ce={template:y,inject:["acl","tinect2faService"],props:{settings:{type:Object,required:!1,default:()=>({})}},data(){return{summary:null,isLoading:!0,hasError:!1}},computed:{salesChannelId(){return this.settings.salesChannelId??null},protectedCustomers(){return this.summary?this.summary.totp+this.summary.email+this.summary.enforced:0},tiles(){return this.summary?[{key:"protected",value:this.formatNumber(this.protectedCustomers),label:this.$t("tinect-2fa.dashboard.summary.protected"),hint:this.$t("tinect-2fa.dashboard.summary.share",{rate:this.formatPercent(this.share(this.protectedCustomers,this.summary.customers)),total:this.formatNumber(this.summary.customers)})},{key:"totp",value:this.formatNumber(this.summary.totp),label:this.$t("tinect-2fa.dashboard.summary.totp")},{key:"email",value:this.formatNumber(this.summary.email),label:this.$t("tinect-2fa.dashboard.summary.email")},{key:"enforced",value:this.formatNumber(this.summary.enforced),label:this.$t("tinect-2fa.dashboard.summary.enforced"),hint:this.$t("tinect-2fa.dashboard.summary.enforcedHint")},{key:"users",value:this.formatNumber(this.summary.usersWithTotp),label:this.$t("tinect-2fa.dashboard.summary.users"),hint:this.$t("tinect-2fa.dashboard.summary.usersHint",{total:this.formatNumber(this.summary.users)})}]:[]}},watch:{salesChannelId:{immediate:!0,handler(){this.load()}}},methods:{async load(){if(!this.acl.can("customer.viewer")){this.isLoading=!1;return}this.isLoading=!0,this.hasError=!1;try{this.summary=await this.tinect2faService.getDashboard("summary",{salesChannelId:this.salesChannelId})}catch{this.summary=null,this.hasError=!0}finally{this.isLoading=!1}},share(e,t){return t?e/t:0},formatNumber(e){return new Intl.NumberFormat().format(e)},formatPercent(e){return new Intl.NumberFormat(void 0,{style:"percent",maximumFractionDigits:1}).format(e)}}}});var F,S=i(()=>{F=`{% block tinect_2fa_widget_activated %}
<div class="tinect-2fa-widget-activated">
    <div class="tinect-2fa-widget-activated__total">
        {{ formattedTotal }}
        <span class="tinect-2fa-widget-activated__breakdown">
            {{ formattedBreakdown }}
        </span>
    </div>
    <sw-chart-card
        class="tinect-2fa-widget-activated__chart"
        :available-ranges="availableRanges"
        :default-range-index="defaultRangeIndex"
        :series="chartSeries"
        :options="chartOptions"
        :is-loading="isLoading"
        type="bar"
        fill-empty-values="day"
        sort
        position-identifier="tinect-2fa-widget-activated"
        @sw-chart-card-range-update="onRangeUpdate"
    >
        <template #range-option="{ range }">
            {{ $t(\`tinect-2fa.dashboard.range.\${range}\`) }}
        </template>
    </sw-chart-card>
</div>
{% endblock %}
`});var z=i(()=>{});var T={};n(T,{default:()=>pe});var l,me,pe,C=i(()=>{S();z();l={"7Days":7,"30Days":30,"90Days":90,"180Days":180,"360Days":360},me="30Days",pe={template:F,inject:["acl","tinect2faService"],emits:["update-settings"],props:{settings:{type:Object,required:!1,default:()=>({})}},data(){return{days:[],selectedRange:Object.hasOwn(l,this.settings.range)?this.settings.range:me,fromDate:null,isLoading:!0}},computed:{salesChannelId(){return this.settings.salesChannelId??null},availableRanges(){return Object.keys(l)},defaultRangeIndex(){return Math.max(0,this.availableRanges.indexOf(this.selectedRange))},totals(){return this.days.reduce((e,t)=>({totp:e.totp+t.totp,email:e.email+t.email}),{totp:0,email:0})},formattedTotal(){return new Intl.NumberFormat().format(this.totals.totp+this.totals.email)},formattedBreakdown(){let e=new Intl.NumberFormat;return this.$t("tinect-2fa.dashboard.activated.breakdown",{totp:e.format(this.totals.totp),email:e.format(this.totals.email)})},chartSeries(){return[{name:this.$t("tinect-2fa.dashboard.activated.seriesTotp"),data:this.points("totp")},{name:this.$t("tinect-2fa.dashboard.activated.seriesEmail"),data:this.points("email")}]},chartOptions(){return{chart:{stacked:!0},dataLabels:{enabled:!1},legend:{show:!0,position:"bottom"},xaxis:{type:"datetime",min:this.fromDate?.getTime(),labels:{datetimeUTC:!1}},yaxis:{min:0,forceNiceScale:!0,labels:{formatter:e=>Math.round(e).toString()}}}}},watch:{salesChannelId:{immediate:!0,handler(){this.load()}}},methods:{async load(){if(!this.acl.can("customer.viewer")){this.isLoading=!1;return}let e=l[this.selectedRange],t=new Date;t.setHours(0,0,0,0),t.setDate(t.getDate()-e),this.isLoading=!0,this.fromDate=t;try{let a=await this.tinect2faService.getDashboard("activated-per-day",{days:e,salesChannelId:this.salesChannelId,timeZone:this.timeZone()});this.days=a.days}catch{this.days=[]}finally{this.isLoading=!1}},points(e){return this.days.map(t=>({x:Date.parse(`${t.date}T00:00:00`),y:t[e]}))},timeZone(){return Shopware.Store.get("session").currentUser?.timeZone??Intl.DateTimeFormat().resolvedOptions().timeZone},onRangeUpdate(e){Object.hasOwn(l,e)&&(this.selectedRange=e,this.$emit("update-settings",{range:e}),this.load())}}}});var L,x=i(()=>{L=`{% block tinect_2fa_widget_recent %}
<div class="tinect-2fa-widget-recent">
    <p
        v-if="hasError"
        class="tinect-2fa-widget-recent__empty"
    >
        {{ $t('tinect-2fa.dashboard.loadError') }}
    </p>
    <p
        v-else-if="!isLoading && activations.length === 0"
        class="tinect-2fa-widget-recent__empty"
    >
        {{ $t('tinect-2fa.dashboard.recent.empty') }}
    </p>
    <sw-data-grid
        v-else
        class="tinect-2fa-widget-recent__grid"
        :data-source="activations"
        :columns="columns"
        :is-loading="isLoading"
        :show-selection="false"
        :show-actions="false"
        :plain-appearance="true"
        :allow-inline-edit="false"
        :allow-column-edit="false"
    >
        <template #column-customer="{ item }">
            <router-link :to="{ name: 'sw.customer.detail', params: { id: item.customerId } }">
                {{ item.lastName }}, {{ item.firstName }}
            </router-link>
            <div class="tinect-2fa-widget-recent__customer-number">
                {{ item.customerNumber }}
            </div>
        </template>

        <template #column-method="{ item }">
            <span
                class="tinect-2fa-widget-recent__method"
                :class="\`tinect-2fa-widget-recent__method--\${item.method}\`"
            >
                {{ methodLabel(item.method) }}
            </span>
        </template>

        <template #column-createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
        </template>
    </sw-data-grid>
</div>
{% endblock %}
`});var E=i(()=>{});var $={};n($,{default:()=>fe});var fe,P=i(()=>{x();E();fe={template:L,inject:["acl","tinect2faService"],props:{settings:{type:Object,required:!1,default:()=>({})}},data(){return{activations:[],isLoading:!0,hasError:!1}},computed:{salesChannelId(){return this.settings.salesChannelId??null},limit(){return this.settings.limit??10},params(){return{salesChannelId:this.salesChannelId,limit:this.limit}},columns(){return[{property:"customer",label:this.$t("tinect-2fa.dashboard.recent.columnCustomer"),primary:!0},{property:"method",label:this.$t("tinect-2fa.dashboard.recent.columnMethod")},{property:"createdAt",label:this.$t("tinect-2fa.dashboard.recent.columnCreatedAt")}]},dateFilter(){return Shopware.Filter.getByName("date")}},watch:{params:{immediate:!0,handler(){this.load()}}},methods:{async load(){if(!this.acl.can("customer.viewer")){this.isLoading=!1;return}this.isLoading=!0,this.hasError=!1;try{let e=await this.tinect2faService.getDashboard("recent",this.params);this.activations=e.activations}catch{this.activations=[],this.hasError=!0}finally{this.isLoading=!1}},methodLabel(e){return this.$t(`tinect-2fa.dashboard.method.${e}`)},formatDate(e){return e?this.dateFilter(`${e.replace(" ","T")}Z`):"-"}}}});var D,O=i(()=>{D=`{% block rl_user_otp_user_card %}
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
`});var U=i(()=>{});var R={};n(R,{default:()=>be});var be,I=i(()=>{O();U();be={template:D,inject:["tinect2faService"],props:{user:{type:Object,required:!0},isLoading:{type:Boolean,required:!1,default:!1}},data(){return{isLoading2Fa:!1,enabled:!1,generatedSecret:null,generatedSecretUrl:null,oneTimePassword:"",oneTimePasswordError:"",pendingAction:null}},watch:{"user.id":{immediate:!0,handler(){this.loadStatus()}}},methods:{loadStatus(){this.enabled=!1,this.generatedSecret=null,this.generatedSecretUrl=null,this.user?.id&&(this.isLoading2Fa=!0,this.tinect2faService.getUserStatus(this.user.id).then(e=>{this.enabled=e.enabled===!0}).finally(()=>{this.isLoading2Fa=!1}))},generateSecret(){this.isLoading2Fa=!0,this.tinect2faService.getSecret(this.user.username).then(e=>{this.generatedSecret=e.secret,this.generatedSecretUrl=e.qrUrl}).finally(()=>{this.isLoading2Fa=!1})},validateAndSaveOneTimePassword(){this.oneTimePasswordError="",this.pendingAction="save"},disable2FA(){this.pendingAction="remove"},onVerified(){let e=this.pendingAction;this.pendingAction=null,this.isLoading2Fa=!0,(e==="save"?this.tinect2faService.saveUserSecret(this.user.id,this.generatedSecret,this.oneTimePassword):this.tinect2faService.removeUserSecret(this.user.id)).then(()=>{this.enabled=e==="save",this.generatedSecret=null,this.generatedSecretUrl=null,this.oneTimePassword=""}).catch(a=>{this.oneTimePasswordError=a?.response?.data?.error??a?.response?.data?.errors?.[0]?.detail??a.message}).finally(()=>{this.isLoading2Fa=!1})},onCloseVerifyModal(){this.pendingAction=null}}}});var q,M=i(()=>{q=`{% block sw_login_login %}
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
`});var N={};n(N,{default:()=>Ae});var ye,ke,Ae,B=i(()=>{M();({Context:ye,Application:ke}=Shopware),Ae={template:q,emits:["is-loading","is-not-loading"],data(){return{rememberOtpPassword:"",showOtpForm:!1,otp:""}},methods:{loginUserWithPasswordAndOtp(){return this.$emit("is-loading"),this.loginWithOtp(this.username,this.password,this.otp).then(()=>{this.handleLoginSuccess(),this.$emit("is-not-loading")}).catch(e=>{this.password="",this.otp="",this.showOtpForm=!1,this.handleLoginError(e),this.$emit("is-not-loading")})},loginWithOtp(e,t,a){return ke.getContainer("init").httpClient.post("/oauth/token",{grant_type:"password",client_id:"administration",scopes:"write",username:e,password:t,tinect_2fa_otp:a},{baseURL:ye.api.apiPath}).then(r=>{let c=this.loginService.setBearerAuthentication({access:r.data.access_token,refresh:r.data.refresh_token,expiry:r.data.expires_in});return window.localStorage.setItem("redirectFromLogin","true"),c})},loginUserWithPassword(){this.rememberOtpPassword=this.password,this.$super("loginUserWithPassword")},handleLoginError(e){if(e?.response?.data?.errors?.[0]?.detail!=="request-otp"){this.$super("handleLoginError",e);return}this.password=this.rememberOtpPassword,this.showOtpForm=!0}}}});var V,H=i(()=>{V=`{% block sw_profile_index_general_password %}
    <tinect-user-otp
        v-if="showPasswordChangeCard && user"
        :user="user"
        :isLoading="isUserLoading"
    ></tinect-user-otp>

    {% parent() %}
{% endblock %}
`});var Z={};n(Z,{default:()=>Se});var Se,K=i(()=>{H();Se={template:V}});var G,W=i(()=>{G=`{% block sw_setting_user_detail_card_integrations %}
    <tinect-user-otp
        v-if="user && !user._isNew"
        :user="user"
        :isLoading="isLoading"
    ></tinect-user-otp>

    {% parent() %}
{% endblock %}
`});var J={};n(J,{default:()=>ze});var ze,Y=i(()=>{W();ze={template:G}});var X,Q=i(()=>{X=`{% block sw_customer_base_metadata_active %}
    {% parent() %}

    <sw-description-list>
        {% block sw_customer_base_metadata_2fa_label %}
        <dt class="sw-customer-base-info__label">
            {{ $tc('tinect-2fa.settings.user-detail.title') }}
        </dt>
        {% endblock %}

        {% block sw_customer_base_metadata_2fa_content %}
        <dd
            v-if="!customerEditMode || !twoFactorAuthenticationRemovable"
            class="sw-customer-base__label-is-active"
        >
            {{ twoFactorAuthenticationLabel }}
        </dd>
        {% endblock %}

        {% block sw_customer_base_metadata_2fa_editor %}
        <dd v-else>
            {{ twoFactorAuthenticationLabel }}
            <mt-button
                @click="disable2FA"
            >
                {{ $tc('tinect-2fa.settings.user-detail.enabled.disable') }}
            </mt-button>
        </dd>
        {% endblock %}
    </sw-description-list>
{% endblock %}
`});var ee={};n(ee,{default:()=>Ce});var Ce,te=i(()=>{Q();Ce={template:X,inject:["tinect2faService"],data(){return{twoFactorAuthenticationMethod:null,twoFactorAuthenticationForced:!1}},computed:{twoFactorAuthenticationLabel(){return this.twoFactorAuthenticationMethod==="totp"?this.$tc("tinect-2fa.customer.method.totp"):this.twoFactorAuthenticationMethod==="email"?this.$tc(this.twoFactorAuthenticationForced?"tinect-2fa.customer.method.email-forced":"tinect-2fa.customer.method.email"):this.$tc("tinect-2fa.customer.method.none")},twoFactorAuthenticationRemovable(){return this.twoFactorAuthenticationMethod!==null&&!this.twoFactorAuthenticationForced}},methods:{createdComponent(){this.$super("createdComponent"),this.loadTwoFactorAuthenticationStatus()},loadTwoFactorAuthenticationStatus(){this.twoFactorAuthenticationMethod=null,this.twoFactorAuthenticationForced=!1,this.customer?.id&&this.tinect2faService.getCustomerStatus(this.customer.id).then(e=>{this.twoFactorAuthenticationMethod=e.method??null,this.twoFactorAuthenticationForced=e.forced===!0}).catch(()=>{})},disable2FA(){this.tinect2faService.removeCustomerSecret(this.customer.id).then(()=>{this.loadTwoFactorAuthenticationStatus()})}}}});var h={"tinect-2fa":{settings:{"user-detail":{title:"Two factor authentication",enabled:{title:"Two factor authentication is enabled",description:"Congrats! You're secure! To disable 2FA for your account, click the button below.",disable:"Disable 2FA"},"not-enabled":{title:"Two factor authentication is not enabled",description:"Two factor authentication is not enabled for your account. Click the button below to set it up.","get-started":"Click here to get started"},generating:{"scan-code":"Scan the code on the left with your 2FA app.",description:"Fill in your One Time Password and click 'Validate & enable' to check the code and enable 2FA for your admin account.","error-title":"Something went wrong","validate-save":"Validate & save"}}},"one-time-password":"One-time password",customer:{method:{totp:"Active \u2013 app (TOTP)",email:"Active \u2013 e-mail","email-forced":"Active \u2013 e-mail (enforced)",none:"Inactive"}},dashboard:{group:"Two-factor authentication",salesChannel:"Sales channel",salesChannelHelp:"Only count customers of this sales channel. Leave empty for all sales channels.",loadError:"The data could not be loaded.",range:{"7Days":"Last 7 days","30Days":"Last 30 days","90Days":"Last 90 days","180Days":"Last 180 days","360Days":"Last 360 days"},method:{totp:"App (TOTP)",email:"E-mail"},summary:{label:"2FA usage",description:"Customers protected by 2FA per method and administration users with an app",protected:"Protected customers",share:"{rate} of {total} customers",totp:"App (TOTP)",email:"E-mail (chosen)",enforced:"E-mail (enforced)",enforcedHint:"Without own setup",users:"Admin users with app",usersHint:"of {total} active users"},activated:{label:"2FA activations",description:"Apps set up and e-mail codes chosen per day",breakdown:"{totp} app \xB7 {email} e-mail",seriesTotp:"App (TOTP)",seriesEmail:"E-mail"},recent:{label:"Recently activated 2FA",description:"The customers who most recently set up an app or chose e-mail codes",limit:"Number of entries",columnCustomer:"Customer",columnMethod:"Method",columnCreatedAt:"Activated at",empty:"No customer has activated 2FA yet."}}}};var f={"tinect-2fa":{settings:{"user-detail":{title:"Zwei-Faktor-Authentifizierung",enabled:{title:"Zwei-Faktor-Authentifizierung ist aktiv",description:"Gl\xFCckwunsch, dein Account ist sicher! Um 2FA zu deaktivieren klicke auf den nachstehenden Button.",disable:"2FA deaktivieren"},"not-enabled":{title:"Zwei-Faktor-Authentifizierung ist inaktiv",description:"Zwei-Faktor-Authentifizierung ist inaktiv! Zum Aktivieren klicke auf den nachstehenden Button.","get-started":"2FA aktivieren"},generating:{"scan-code":"Scanne den Code in deiner 2FA-App.",description:"Trage dein Einmal-Passwort ein und klicke auf Validieren & Speichern um 2FA f\xFCr deinen Account zu aktivieren.","error-title":"Es ist ein Fehler aufgetreten","validate-save":"Validieren & Speichern"}}},"one-time-password":"Einmal-Passwort",customer:{method:{totp:"Aktiv \u2013 App (TOTP)",email:"Aktiv \u2013 E-Mail","email-forced":"Aktiv \u2013 E-Mail (erzwungen)",none:"Inaktiv"}},dashboard:{group:"Zwei-Faktor-Authentifizierung",salesChannel:"Verkaufskanal",salesChannelHelp:"Nur Kunden dieses Verkaufskanals ber\xFCcksichtigen. Leer lassen f\xFCr alle Verkaufskan\xE4le.",loadError:"Die Daten konnten nicht geladen werden.",range:{"7Days":"Letzte 7 Tage","30Days":"Letzte 30 Tage","90Days":"Letzte 90 Tage","180Days":"Letzte 180 Tage","360Days":"Letzte 360 Tage"},method:{totp:"App (TOTP)",email:"E-Mail"},summary:{label:"2FA-Nutzung",description:"Durch 2FA gesch\xFCtzte Kunden nach Methode und Admin-Benutzer mit App",protected:"Gesch\xFCtzte Kunden",share:"{rate} von {total} Kunden",totp:"App (TOTP)",email:"E-Mail (gew\xE4hlt)",enforced:"E-Mail (erzwungen)",enforcedHint:"Ohne eigene Einrichtung",users:"Admin-Benutzer mit App",usersHint:"von {total} aktiven Benutzern"},activated:{label:"2FA-Aktivierungen",description:"Eingerichtete Apps und gew\xE4hlte E-Mail-Codes pro Tag",breakdown:"{totp} App \xB7 {email} E-Mail",seriesTotp:"App (TOTP)",seriesEmail:"E-Mail"},recent:{label:"Zuletzt aktivierte 2FA",description:"Die Kunden, die zuletzt eine App eingerichtet oder E-Mail-Codes gew\xE4hlt haben",limit:"Anzahl der Eintr\xE4ge",columnCustomer:"Kunde",columnMethod:"Methode",columnCreatedAt:"Aktiviert am",empty:"Es hat noch kein Kunde 2FA aktiviert."}}}};var g={"tinect-2fa":{settings:{"user-detail":{title:"Authentification \xE0 deux facteurs (2FA)",enabled:{title:"L'authentification \xE0 deux facteurs est activ\xE9e",description:"F\xE9licitations! Vous \xEAtes en s\xE9curit\xE9! Pour d\xE9sactiver 2FA pour votre compte, cliquez sur le bouton ci-dessous.",disable:"D\xE9sactiver 2FA"},"not-enabled":{title:"L'authentification \xE0 deux facteurs n'est pas activ\xE9e",description:"L'authentification \xE0 deux facteurs n'est pas activ\xE9e pour votre compte. Cliquez sur le bouton ci-dessous pour le configurer.","get-started":"Cliquez ici pour commencer"},generating:{"scan-code":"Scannez le code \xE0 gauche avec votre application 2FA.",description:"Entrez votre mot de passe \xE0 usage unique (OTP) et cliquez sur 'Valider & activer' pour v\xE9rifier le code et activer 2FA pour votre compte administrateur.","error-title":"Un probl\xE8me est survenu","validate-save":"Valider & sauvegarder"}}},"one-time-password":"Mot de passe \xE0 usage unique",customer:{method:{totp:"Active \u2013 application (TOTP)",email:"Active \u2013 e-mail","email-forced":"Active \u2013 e-mail (obligatoire)",none:"Inactive"}},dashboard:{group:"Authentification \xE0 deux facteurs",salesChannel:"Canal de vente",salesChannelHelp:"Ne compter que les clients de ce canal de vente. Laisser vide pour tous les canaux de vente.",loadError:"Les donn\xE9es n'ont pas pu \xEAtre charg\xE9es.",range:{"7Days":"7 derniers jours","30Days":"30 derniers jours","90Days":"90 derniers jours","180Days":"180 derniers jours","360Days":"360 derniers jours"},method:{totp:"Application (TOTP)",email:"E-mail"},summary:{label:"Utilisation de la 2FA",description:"Clients prot\xE9g\xE9s par la 2FA par m\xE9thode et utilisateurs de l'administration avec application",protected:"Clients prot\xE9g\xE9s",share:"{rate} de {total} clients",totp:"Application (TOTP)",email:"E-mail (choisi)",enforced:"E-mail (obligatoire)",enforcedHint:"Sans configuration propre",users:"Administrateurs avec application",usersHint:"sur {total} utilisateurs actifs"},activated:{label:"Activations 2FA",description:"Applications configur\xE9es et codes par e-mail choisis par jour",breakdown:"{totp} application \xB7 {email} e-mail",seriesTotp:"Application (TOTP)",seriesEmail:"E-mail"},recent:{label:"2FA r\xE9cemment activ\xE9e",description:"Les clients qui ont r\xE9cemment configur\xE9 une application ou choisi les codes par e-mail",limit:"Nombre d'entr\xE9es",columnCustomer:"Client",columnMethod:"M\xE9thode",columnCreatedAt:"Activ\xE9e le",empty:"Aucun client n'a encore activ\xE9 la 2FA."}}}};var w={"tinect-2fa":{settings:{"user-detail":{title:"Twee-factorauthenticatie",enabled:{title:"Twee-factorauthenticatie is ingeschakeld",description:"Proficiat! Je account is veilig! Klik op onderstaande knop om 2FA uit te zetten.",disable:"Zet 2FA uit"},"not-enabled":{title:"Twee-factorauthenticatie is uitgeschakeld",description:"Twee-factorauthenticatie is niet actief voor jouw account. Klik op onderstaande knop om 2FA aan te zetten.","get-started":"2FA instellen"},generating:{"scan-code":"Scan de code links met jouw 2FA app.",description:"Vul je One Time Password token in, en klik op 'Valideer & sla op' om de token na te kijken. Als de code correct is wordt 2FA aangezet voor jouw account.","error-title":"Er ging iets mis.","validate-save":"Valideer & sla op"}}},"one-time-password":"Eenmalig wachtwoord",customer:{method:{totp:"Actief \u2013 app (TOTP)",email:"Actief \u2013 e-mail","email-forced":"Actief \u2013 e-mail (verplicht)",none:"Inactief"}},dashboard:{group:"Tweestapsverificatie",salesChannel:"Verkoopkanaal",salesChannelHelp:"Alleen klanten van dit verkoopkanaal meetellen. Leeg laten voor alle verkoopkanalen.",loadError:"De gegevens konden niet worden geladen.",range:{"7Days":"Laatste 7 dagen","30Days":"Laatste 30 dagen","90Days":"Laatste 90 dagen","180Days":"Laatste 180 dagen","360Days":"Laatste 360 dagen"},method:{totp:"App (TOTP)",email:"E-mail"},summary:{label:"2FA-gebruik",description:"Met 2FA beveiligde klanten per methode en beheerders met app",protected:"Beveiligde klanten",share:"{rate} van {total} klanten",totp:"App (TOTP)",email:"E-mail (gekozen)",enforced:"E-mail (verplicht)",enforcedHint:"Zonder eigen instelling",users:"Beheerders met app",usersHint:"van {total} actieve gebruikers"},activated:{label:"2FA-activeringen",description:"Ingestelde apps en gekozen e-mailcodes per dag",breakdown:"{totp} app \xB7 {email} e-mail",seriesTotp:"App (TOTP)",seriesEmail:"E-mail"},recent:{label:"Recent geactiveerde 2FA",description:"De klanten die het laatst een app hebben ingesteld of e-mailcodes hebben gekozen",limit:"Aantal items",columnCustomer:"Klant",columnMethod:"Methode",columnCreatedAt:"Geactiveerd op",empty:"Nog geen enkele klant heeft 2FA geactiveerd."}}}};var b={"tinect-2fa":{settings:{"user-detail":{title:"Uwierzytelnianie dwusk\u0142adnikowe",enabled:{title:"Uwierzytelnianie dwusk\u0142adnikowe jest w\u0142\u0105czone",description:"Gratulacje! Jeste\u015B bezpieczny! Aby wy\u0142\u0105czy\u0107 2FA dla swojego konta, kliknij przycisk poni\u017Cej.",disable:"Wy\u0142\u0105cz 2FA"},"not-enabled":{title:"Uwierzytelnianie dwusk\u0142adnikowe nie jest w\u0142\u0105czone",description:"Uwierzytelnianie dwusk\u0142adnikowe nie jest w\u0142\u0105czone dla Twojego konta. Kliknij przycisk poni\u017Cej, aby je skonfigurowa\u0107.","get-started":"Kliknij, aby rozpocz\u0105\u0107"},generating:{"scan-code":"Zeskanuj kod po lewej stronie za pomoc\u0105 aplikacji 2FA.",description:"Wprowad\u017A swoje has\u0142o jednorazowe i kliknij \u201EZweryfikuj i w\u0142\u0105cz\u201D, aby sprawdzi\u0107 kod i w\u0142\u0105czy\u0107 2FA dla swojego konta administratora.","error-title":"Co\u015B posz\u0142o nie tak","validate-save":"Zweryfikuj i zapisz"}}},"one-time-password":"Has\u0142o jednorazowe",customer:{method:{totp:"Aktywne \u2013 aplikacja (TOTP)",email:"Aktywne \u2013 e-mail","email-forced":"Aktywne \u2013 e-mail (wymuszone)",none:"Nieaktywne"}},dashboard:{group:"Uwierzytelnianie dwusk\u0142adnikowe",salesChannel:"Kana\u0142 sprzeda\u017Cy",salesChannelHelp:"Uwzgl\u0119dniaj tylko klient\xF3w tego kana\u0142u sprzeda\u017Cy. Pozostaw puste dla wszystkich kana\u0142\xF3w.",loadError:"Nie uda\u0142o si\u0119 za\u0142adowa\u0107 danych.",range:{"7Days":"Ostatnie 7 dni","30Days":"Ostatnie 30 dni","90Days":"Ostatnie 90 dni","180Days":"Ostatnie 180 dni","360Days":"Ostatnie 360 dni"},method:{totp:"Aplikacja (TOTP)",email:"E-mail"},summary:{label:"Wykorzystanie 2FA",description:"Klienci chronieni 2FA wed\u0142ug metody oraz administratorzy z aplikacj\u0105",protected:"Chronieni klienci",share:"{rate} z {total} klient\xF3w",totp:"Aplikacja (TOTP)",email:"E-mail (wybrany)",enforced:"E-mail (wymuszony)",enforcedHint:"Bez w\u0142asnej konfiguracji",users:"Administratorzy z aplikacj\u0105",usersHint:"z {total} aktywnych u\u017Cytkownik\xF3w"},activated:{label:"Aktywacje 2FA",description:"Skonfigurowane aplikacje i wybrane kody e-mail dziennie",breakdown:"{totp} aplikacja \xB7 {email} e-mail",seriesTotp:"Aplikacja (TOTP)",seriesEmail:"E-mail"},recent:{label:"Ostatnio aktywowane 2FA",description:"Klienci, kt\xF3rzy ostatnio skonfigurowali aplikacj\u0119 lub wybrali kody e-mail",limit:"Liczba wpis\xF3w",columnCustomer:"Klient",columnMethod:"Metoda",columnCreatedAt:"Aktywowano",empty:"\u017Baden klient nie aktywowa\u0142 jeszcze 2FA."}}}};var{ApiService:s}=Shopware.Classes,o=class extends s{constructor(t,a,r="_action/tinect-2fa"){super(t,a,r)}getSecret(t){let a=`${this.getApiBasePath()}/generate-secret`;return this.httpClient.get(a,{params:{holder:t},headers:this.getBasicHeaders()}).then(r=>s.handleResponse(r))}getUserStatus(t){return this.sendRequest("get",`user/${t}/status`)}saveUserSecret(t,a,r){return this.sendRequest("post",`user/${t}/secret`,{secret:a,code:r})}removeUserSecret(t){return this.sendRequest("delete",`user/${t}/secret`)}getCustomerStatus(t){return this.sendRequest("get",`customer/${t}/status`)}removeCustomerSecret(t){return this.sendRequest("delete",`customer/${t}/secret`)}getDashboard(t,a={}){return this.httpClient.get(`${this.getApiBasePath()}/dashboard/${t}`,{params:Object.fromEntries(Object.entries(a).filter(([,r])=>r!=null)),headers:this.getBasicHeaders()}).then(r=>s.handleResponse(r))}sendRequest(t,a,r=void 0){return this.httpClient.request({method:t,url:`${this.getApiBasePath()}/${a}`,data:r,headers:this.getBasicHeaders()}).then(c=>s.handleResponse(c))}getUserVerificationTicket(){let t=`${this.getApiBasePath()}/user-verification-ticket`;return this.httpClient.post(t,{},{headers:this.getBasicHeaders()}).then(a=>s.handleResponse(a).ticket)}};var{Application:u,Context:le}=Shopware;u.addServiceProvider("tinect2faService",e=>{let t=u.getContainer("init");return new o(t.httpClient,e.loginService)});var m=Shopware.Service("loginService");m.verifyUserByUsername=(e,t)=>Shopware.Service("tinect2faService").getUserVerificationTicket().catch(()=>"").then(a=>u.getContainer("init").httpClient.post("/oauth/token",{grant_type:"password",client_id:"administration",scope:"user-verified",username:e,password:t,tinect_2fa_ticket:a},{baseURL:le.api.apiPath})).then(a=>({access:a.data.access_token,expiry:a.data.expires_in,refresh:a.data.refresh_token}));m.verifyUserToken=e=>{let t=Shopware.Store.get("session").currentUser?.username??"";return m.verifyUserByUsername(t,e).then(({access:a})=>{if(typeof a=="string")return a;throw new Error("access Token should be of type String")})};var d="tinect-2fa",p={name:"salesChannelId",type:"entity",entity:"sales_channel",label:"tinect-2fa.dashboard.salesChannel",helpText:"tinect-2fa.dashboard.salesChannelHelp",default:null},j=!1;function ge(){let e=Shopware.FroshDashboard;j||!e||(j=!0,e.registerGroup({id:d,label:"tinect-2fa.dashboard.group",position:41}),e.registerWidget({id:"tinect-2fa-widget-summary",label:"tinect-2fa.dashboard.summary.label",description:"tinect-2fa.dashboard.summary.description",icon:"regular-shield",component:"tinect-2fa-widget-summary",defaultSize:"medium",supportedSizes:["small","medium","large","full"],group:d,acl:["customer.viewer"],settings:[p]}),e.registerWidget({id:"tinect-2fa-widget-activated",label:"tinect-2fa.dashboard.activated.label",description:"tinect-2fa.dashboard.activated.description",icon:"regular-chart-line",component:"tinect-2fa-widget-activated",defaultSize:"medium",supportedSizes:["medium","large","full"],group:d,acl:["customer.viewer"],settings:[p]}),e.registerWidget({id:"tinect-2fa-widget-recent",label:"tinect-2fa.dashboard.recent.label",description:"tinect-2fa.dashboard.recent.description",icon:"regular-list",component:"tinect-2fa-widget-recent",defaultSize:"large",supportedSizes:["medium","large","full"],group:d,acl:["customer.viewer"],settings:[p,{name:"limit",type:"select",label:"tinect-2fa.dashboard.recent.limit",default:10,options:[{value:5,label:"5"},{value:10,label:"10"},{value:20,label:"20"},{value:50,label:"50"}]}]}))}Shopware.Component.register("tinect-2fa-widget-summary",()=>Promise.resolve().then(()=>(_(),A)));Shopware.Component.register("tinect-2fa-widget-activated",()=>Promise.resolve().then(()=>(C(),T)));Shopware.Component.register("tinect-2fa-widget-recent",()=>Promise.resolve().then(()=>(P(),$)));Shopware.Component.override("frosh-dashboard-grid",{beforeCreate(){ge()}});Shopware.Component.register("tinect-user-otp",()=>Promise.resolve().then(()=>(I(),R)));Shopware.Component.override("sw-login-login",()=>Promise.resolve().then(()=>(B(),N)));Shopware.Component.getComponentRegistry().has("sw-profile-index-general")&&Shopware.Component.override("sw-profile-index-general",()=>Promise.resolve().then(()=>(K(),Z)));Shopware.Component.getComponentRegistry().has("sw-users-permissions-user-detail")&&Shopware.Component.override("sw-users-permissions-user-detail",()=>Promise.resolve().then(()=>(Y(),J)));Shopware.Component.getComponentRegistry().has("sw-customer-base-info")&&Shopware.Component.override("sw-customer-base-info",()=>Promise.resolve().then(()=>(te(),ee)));Shopware.Locale.extend("de-DE",f);Shopware.Locale.extend("en-GB",h);Shopware.Locale.extend("fr-FR",g);Shopware.Locale.extend("nl-NL",w);Shopware.Locale.extend("pl-PL",b);})();
