export interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}

export type Input = {
    itemID: number;
    quantity: number;
};
