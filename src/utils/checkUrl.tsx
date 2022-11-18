//funzione per la validazione di un URL

export const isValidURL = (string: string): boolean => {
    try{
        let result: boolean = Boolean(new URL(string)); 
        return result
    }catch(e){
        return false
    }
}