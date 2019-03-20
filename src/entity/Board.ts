import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany } from "typeorm";
import { Message } from "./Message";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false, default: "" })
    name: string;

    @Column({type: "varchar", nullable: false, default: "normal"})
    role: string;

    @Column({ type: "datetime", nullable: true })
    regDate: Date;

    @Column({ type: "datetime", nullable: true })
    modDate: Date;

    @OneToMany(type => Message, message => message.board, {lazy: true})
    messages: Message[];
}