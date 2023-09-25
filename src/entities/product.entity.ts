import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("Product")
@Unique(["name", "slug"])
@Check(`"unitPrice">=0`)
@Check(`"unitInStock">=0`)
class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "float", default: 0 })
  unitPrice: number;

  @Column({ type: "float", default: 0 })
  discountPercentage: number;

  @Column({ type: "int", default: 0 })
  unitInStock: number;

  @Column({ length: 200 })
  description: string;

  @Column({ type: "simple-array" })
  images: string[];

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;
}

export { Product };
