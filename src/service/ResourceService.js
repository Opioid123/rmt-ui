import axios from 'axios';

export class ResourceService {
    
    getResources() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getMappingData() {
        return axios.get('showcase/resources/demo/data/mapping-maintenance.json')
                .then(res => res.data.data);
    }
    
    getAdminResources() {
        return axios.get('showcase/resources/demo/data/admin-maintenance.json')
                .then(res => res.data.data);
    }

    deleteAdminResource() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    updateAdminResource() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    addAdminResource() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getAdminResource() {
        return axios.get('showcase/resources/demo/data/car-small.json')
                .then(res => res.data.data);
    }
    deleteResource() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    updateResource() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    addResource() {
        return axios.get('showcase/resources/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getResource() {
        return axios.get('showcase/resources/demo/data/car-small.json')
                .then(res => res.data.data);
    }

    getCarsMedium() {
        return axios.get('showcase/resources/demo/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('showcase/resources/demo/data/cars-large.json')
                .then(res => res.data.data);
    }
}