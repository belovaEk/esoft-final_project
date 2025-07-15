import 'dotenv/config';
var GoogleStrategy = require('passport-google-oidc');
import { GoogleProfile } from '../types';
import { getFederatedCredentials, createFederatedCredentials, getUser } from '../../../data/sql/auth';
import { postClient } from '../../../data/sql/clientsData';


export const configureGoogleStrategy = () => new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
    },
   async function verify(issuer: string, profile: GoogleProfile, cb: (error: any, user?: any) => void) {
           const email = profile.emails?.[0]?.value;
           try {
                   const cred = await getFederatedCredentials(issuer, profile.id);
               
                   if (!cred) {    
                       const newClientId = await postClient(profile.displayName, email);
                       await createFederatedCredentials(newClientId, issuer, profile.id)
                       return cb(null, {
                           id: newClientId,
                           name: profile.displayName,
                           email: email
                       });
                   } else {
                       const user = await getUser(cred.client_id);
                       console.log(user)
                       return cb(null, user || false);
                   }
           } catch (err) {
               return cb(err);
           }
       }
)
