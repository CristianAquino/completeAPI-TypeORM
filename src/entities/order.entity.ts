import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Order")
class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  idCustomer: string;

  @Column()
  customerCountry: string;

  @Column()
  customerEmail: string;

  @Column()
  customerName: string;

  @Column()
  customerPaymentMethod: string;

  @Column()
  customerCurrency: string;

  @Column({ type: "float", default: 0 })
  discountPercentage: number;

  @Column({ type: "float" })
  subtotal: number;

  @Column({ type: "float" })
  total: number;

  @Column({ type: "json" })
  products: object[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;
}

export { Order };
