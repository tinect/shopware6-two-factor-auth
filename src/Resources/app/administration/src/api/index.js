import Tinect2faService from './tinect-2fa';

const { Application } = Shopware;

Application.addServiceProvider('tinect2faService', (container) => {
    const initContainer = Application.getContainer('init');

    return new Tinect2faService(initContainer.httpClient, container.loginService);
});
