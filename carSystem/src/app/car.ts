import { viacleService } from './car.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export class Viacle {
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

    // constructor get as an iput an object with the data and a viacleService 
    constructor(private viacleService: viacleService,
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
    public setEditDateString(date:string) {
        this.editDate = new Date(date);
    }


    //////////crud operations/////////////////////

    // check first if the licence plate exist, if not insert the car to database
    addCarToDataBase() {
        this.viacleService.getLicencePlate(this.licencePlate, this.id).pipe(takeUntil(this.destroy$))
            .subscribe((resPlate: string) => {
                if (resPlate) {
                    this.insertCar();
                }
                else {
                    alert("licence plate alredy exist");
                }
            });
    }

    //check first if the licence plate exist, if not or the id of the viacle found=this update this
    updateCar() {
        this.viacleService.getLicencePlate(this.licencePlate, this.id).pipe(takeUntil(this.destroy$))
            .subscribe((resPlate: string) => {
                if (resPlate) {
                    this.update();
                }
                else {
                    alert("licence alredy belong to another viacle");
                }
            })
    }


    //help function that generate the relevent data to json object
    buildObject() {
        let data = {
            id: this.getId(),
            licencePlate: this.getLicencePlate(),
            viacleType: this.getVicaleType(),
            fourOnFour: this.getFourOnFour(),
            engineCapacity: this.getEnginCapacity(),
            manufactoryYear: this.getManufactoryYear(),
            comments: this.getComments(),
            deliveredToEmployee: this.getDeliveredToEmployee(),
            treatmentDate: this.formatDate(this.getTreatmentDate()),
            editDate: this.formatDate(this.getEditDate())
        }
        return data;
    }

    // insert the car to the data base after licencne plate check
    private insertCar() {
        this.viacleService.addCar(this.buildObject()).pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                alert(res.answer);
            });
    }

    // update this after licence check
    private update() {
        this.viacleService.updateCar(this.buildObject()).pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                alert(res.answer);
            });
    }

    //delete car from data base
    deleteCar() {
        this.viacleService.deleteCar(this.getId()).pipe(takeUntil(this.destroy$)).subscribe();
    }

    // format the date to dd-mm-yy
    formatDate(date: Date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


}