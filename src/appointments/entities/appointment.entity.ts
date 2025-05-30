import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Client } from 'src/clients/entities/client.entity';

@Entity()
export class Appointment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	dateTime: Date;

	@Column({ default: false })
	isShared: boolean;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@ManyToOne(() => Room, room => room.id)
	room: Room;

	@ManyToOne(() => Client, client => client.id)
	client: Client;
}
