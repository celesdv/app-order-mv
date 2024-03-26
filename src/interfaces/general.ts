export interface dataOrder {
	id?: number;
	order_name: string;
	date: Date;
	client: clientModel;
	products?: productModel[];
	revenues?: revenuesModel[];
	payments?: paymentModel[];
	taxes?: taxModel[];
	ars_value: number;
	usd_value: number;
	currency_value: number;
	total_revenues: number;
	total_payments: number;
}

export interface clientModel {
	id?: number;
	first_name: string;
	last_name: string;
	phone: number;
	email: string;
	adress: string;
	city: string;
	observation: string;
}

export interface supplierModel {
	id?: number;
	name: string;
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
	exempt: number;
	not_taxed: number;
	aliquot_10: number;
	aliquot_21: number;
	total: number;
	iva: number;
	bi_iibb: number;
}
