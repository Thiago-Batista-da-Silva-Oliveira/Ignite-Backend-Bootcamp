import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import {v4 as uuidV4} from 'uuid'

@Entity("users_tokens")
class UserTokens {
 @PrimaryColumn()
 id: string;
 @Column()
 user_id: string;

 // many tokens to 1 user
 @ManyToOne(() => User)
 @JoinColumn({name: "user_id"})
 user:User
 @Column()
 refresh_token: string;
 @Column()
 expires_date: Date;
 @CreateDateColumn()
 created_at: Date

 constructor(){
    if(!this.id) {
        this.id = uuidV4()
    }
 }
}

export {UserTokens}