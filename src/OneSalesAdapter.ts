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
		const client = await this.getClient(config);

		await client.put(
				`leads/${id}`,
				toCrmContact(contact)
		);

		return {...contact, avatarUrl: "", contactUrl: ""};
	}

	public async deleteContact(config: Config, id: string) {
		const client = await this.getClient(config);

		await client.delete(
				`leads/${id}`
		);
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
