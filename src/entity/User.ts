import { Entity, PrimaryGeneratedColumn, Column, Generated, BaseEntity } from "typeorm";
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, default: ""})
    password: string;

    @Column({type: "varchar", nullable: false, default: ""})
    name: string;

    @Column({type: "int", nullable: false, default: 0})
    age: number;

    @Column({type: "varchar", nullable: false, default: ""})
    email: string;

    @Generated("uuid")
    @Column({type: "varchar", nullable: false})
    uuid: string;

    @Column({type: "varchar", nullable: false, default: "normal"})
    role: string;

    @Column({type: "datetime", nullable: false})
    regDate: Date;   // 생성날짜

    @Column({type: "datetime", nullable: false})
    modDate: Date;   // 변경날짜
}

