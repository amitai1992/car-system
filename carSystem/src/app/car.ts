import { CarService } from './car.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export class Car {
    private id: number
    private licencePlate: string
    private viacleType: number
    private fourOnFour: boolean
    private engineCapacity?: number
    private manufactoryYear: number
    private comments?: string
    private deliveredToEmployee?: number
    private treatmentDate: Date
    private editDate: Date

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private carService: CarService,
        data: {
            id: number, licencePlate: string, viacleType: number,
            fourOnFour: boolean,
            engineCapacity: number, manufactoryYear: number,
            comments: string, deliveredToEmployee?: number
            treatmentDate: Date
            editDate: Date
        }) {
        for (const property in data) {
            this[property] = data[property];
        }
    }


    /////////// get methods
    public getId(): number {
        return this.id;
    }
    public getLicencePlate(): string {
        return this.licencePlate;
    }
    public getVicaleType(): number {
        return this.viacleType;
    }
    public getFourOnFour(): boolean {
        return this.fourOnFour;
    }
    public getEnginCapacity(): number {
        return this.engineCapacity;
    }
    public getManufactoryYear(): number {
        return this.manufactoryYear;
    }
    public getComments(): string {
        return this.comments;
    }
    public getDeliveredToEmployee(): number {
        return this.deliveredToEmployee;
    }
    public getTreatmentDate(): Date {
        return this.treatmentDate;
    }
    public getEditDate(): Date {
        return this.editDate;
    }

    //////// set methods////////////////////
    public setId(id: number) {
        this.id = id;
    }
    public setLicencePlate(plate: string) {
        this.licencePlate = plate;
    }
    public setViaclType(type: number) {
        this.viacleType = type;
    }
    public setGear(gear: boolean) {
        this.fourOnFour = gear;
    }
    public setEngin(engin: number) {
        this.engineCapacity = engin;
    }
    public setManufactoryYear(year: number) {
        this.manufactoryYear = year;
    }
    public setComments(comments: string) {
        this.comments = comments;
    }
    public setEmployee(employee: number) {
        this.deliveredToEmployee = employee;
    }
    public setTreatmentDate(date: Date) {
        this.treatmentDate = date;
    }
    public setEditDate(date: Date) {
        this.editDate = date;
    }

    //////////crud operations/////////////////////
    // check if the licence plate alredy exist in database, if it is return true els return false

    addCarToDataBase() {
        this.carService.getLicencePlate(this.licencePlate).pipe(takeUntil(this.destroy$))
            .subscribe((resPlate: string) => {
                if (resPlate) {
                    this.insertCar();
                }
                else {
                    alert("licence plate alredy exist");
                }
            });
    }

    //help function that generate the relevent data to json object and pass it to the server
    private buildObject() {
        let data = {
            id: this.getId(),
            licencePlate: this.getLicencePlate(),
            viacleType: this.getVicaleType(),
            fourOnFour: this.getFourOnFour(),
            engineCapacity: this.getEnginCapacity(),
            manufactoryYear: this.getManufactoryYear(),
            comments: this.getComments(),
            deliveredToEmployee: this.getDeliveredToEmployee(),
            treatmentDate: this.getTreatmentDate(),
            editDate: this.getEditDate()
        }
        return data;
    }
    // insert the car to the data base after licencne plate check
    private insertCar() {
        this.carService.addCar(this.buildObject()).pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                alert(res.answer);
            });
    }

    //delete car from data base
    deleteCar() {
        this.carService.deleteCar(this.getId()).pipe(takeUntil(this.destroy$)).subscribe();
    }




}