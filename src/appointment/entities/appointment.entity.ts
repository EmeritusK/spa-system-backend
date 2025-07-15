import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Client } from 'src/client/entities/client.entity';

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

  @ManyToOne(() => Room, (room) => room.appointments)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ManyToOne(() => Client, (client) => client.appointments)
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
