export class Token{
   public constructor(
       public access_token?: string, 
       public token_type?: string, 
       public refresh_token?: string, 
       public expires_in?: string, 
       public scope?: string){ }
}