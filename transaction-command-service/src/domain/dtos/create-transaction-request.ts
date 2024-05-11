export interface ICreateTransactionRequest {
    id: String
    amount: number
    source_user_id: number
    dest_user_id: number
    source_init_bal: number 
    dest_init_bal: number
}
