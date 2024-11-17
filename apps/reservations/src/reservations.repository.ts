import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationDocumnet } from "./models/reservation.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocumnet> {
    protected readonly logger = new Logger(ReservationsRepository.name)

    constructor(
        @InjectModel(ReservationDocumnet.name) reservationModel: Model<ReservationDocumnet>,
    ) {
        super(reservationModel)
    }
}