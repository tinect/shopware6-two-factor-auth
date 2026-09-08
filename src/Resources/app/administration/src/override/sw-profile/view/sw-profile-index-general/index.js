import template from './sw-profile-index-general.html.twig';

export default {
    template,

    methods: {
        onSave() {
            this.$emit('tinect-2fa-save');
        },
    },
};
