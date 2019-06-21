import {Adapter, Config, ContactTemplate, ContactUpdate} from "@clinq/bridge";
import axios from 'axios';
import {toCrmContact} from "./ContactMapper";

const API_BASE_URL = 'https://api.1sales.io/api/v2/';

export class OneSalesAdapter implements Adapter {

	public async getContacts(config: Config) {
		return [];
	}

	public async createContact(config: Config, contact: ContactTemplate) {

		const client = await this.getClient(config);
		const {data: {id}} = await client.post(
				"leads",
				toCrmContact(contact)
		);

		return {...contact, id, avatarUrl: "", contactUrl: ""};
	}

	public async updateContact(config: Config, id: string, contact: ContactUpdate) {
		return {
			id: '',
			contactUrl: null,
			avatarUrl: null,
			name: null,
			firstName: null,
			lastName: null,
			email: null,
			organization: null,
			phoneNumbers: []
		};
	}

	public async deleteContact(config: Config, id: string) {
		throw new Error('not yet implemented');
	}

	private getClient = async (config: Config) => {
		const headers: any = {'Content-Type': 'application/json', 'Accept': 'application/json'};

		const [email, password] = config.apiKey.split(":");

		const {data: {token}} = await axios.create({baseURL: API_BASE_URL, headers}).post(
				"login",
				{email, password}
		);

		return axios.create({baseURL: API_BASE_URL, headers: { ... headers, authorization: 'bearer ' + token}});
	};
};
