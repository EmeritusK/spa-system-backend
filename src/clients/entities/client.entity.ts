import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('clients')
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	idNumber: string;

	@Column()
	fullName: string;

	@Column()
	email: string;

	@Column()
	phone: string;

	@Column()
	emergencyPhone: string;

	@Column({ nullable: true })
	address?: string;

	@Column()
	age: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@OneToMany(() => Appointment, appointment => appointment.id)
	appointments: Appointment[];
}
