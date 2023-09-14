import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("User")
@Unique(["username", "email"])
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: "" })
  firstname: string;

  @Column({ default: "" })
  lastname: string;

  @Column({
    default: true,
  })
  active: boolean;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: null })
  resetToken: string;

  @Column({ default: null })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;
}

export { User };
