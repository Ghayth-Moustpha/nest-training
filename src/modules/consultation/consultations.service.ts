import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsultDto } from './consult.dto';
import { Consultation } from './consultation.interface';

@Injectable()
export class ConsultationsService {
  private consultations: Consultation[] = [];

  create(consultDto: ConsultDto): Consultation {
    const newConsultation: Consultation = {
      id: (this.consultations.length + 1).toString(),
      ...consultDto,
    };
    this.consultations.push(newConsultation);
    return newConsultation;
  }

  findAll(): Consultation[] {
    return this.consultations;
  }

  findOne(id: string): Consultation {
    const consultation = this.consultations.find((c) => c.id === id);
    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found.`);
    }
    return consultation;
  }

  update(id: string, updateDto: Partial<ConsultDto>): Consultation {
    const consultation = this.findOne(id);
    const updatedConsultation = { ...consultation, ...updateDto };
    const index = this.consultations.findIndex((c) => c.id === id);
    this.consultations[index] = updatedConsultation;
    return updatedConsultation;
  }

  remove(id: string): void {
    const index = this.consultations.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Consultation with ID ${id} not found.`);
    }
    this.consultations.splice(index, 1);
  }
}
