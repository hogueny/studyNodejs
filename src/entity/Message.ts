import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Board } from "./Board";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", default: "", nullable: false})
    title: string;

    @Column({type: "text", nullable: false})
    contents: string;

    @Column({type: "datetime", nullable: false})
    regDate: Date;   // 생성날짜

    @Column({type: "datetime", nullable: false})
    modDate: Date;   // 변경날짜

    @ManyToOne(type => Board, board => board.messages)
    board: Board;

    @Column({type: "int", nullable: true})
    boardId: number;

    @ManyToOne(type => User, user => user.messages, {lazy: true})
    user: User;

    @Column({type: "int", nullable: true})
    userId: number;

}