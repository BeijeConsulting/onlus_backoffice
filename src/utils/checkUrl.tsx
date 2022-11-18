//funzione per la validazione di un URL

export const isValidURL = (string: string): boolean => {
    try{
        Boolean(new URL(string)); 
    }catch(e){
        return false
    }
}