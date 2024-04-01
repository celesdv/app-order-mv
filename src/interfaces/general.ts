export interface dataOrder {
	id?: number;
	order_name: string;
	date: Date;
	client: clientModel;
	products?: productModel[];
	revenues?: revenuesModel[];
	payments?: paymentModel[];
	ars_value: number;
	usd_value: number;
	currency_value: number;
	total_revenues: number;
	total_payments: number;
}

export interface clientModel {
	id?: string;
	first_name: string;
	last_name: string;
	phone:string;
	email: string;
	address: string;
	city: string;
	observation: string;
	soft_delete?: boolean;
}

export interface supplierModel {
	id?: string;
	name: string;
	soft_delete?: boolean;
}

export interface productModel {
	id?: number;
	description: string;
	supplier: supplierModel;
	value: number;
	currency: string;
	usd_value: number;
	balance?: number;
	payments: paymentModel[];
	taxes: taxModel;
}

export interface revenuesModel {
	id?: number;
	date: Date;
	ars_value: number;
	currency_value: number;
	usd_value: number;
}

export interface paymentModel {
	id?: number;
	date: Date;
	ars_value: number;
	currency_value: number;
	usd_value: number;
}

export interface taxModel {
	id?: number;
	exempt?: number;
	not_taxed?: number;
	aliquot_10?: number;
	aliquot_21?: number;
}
