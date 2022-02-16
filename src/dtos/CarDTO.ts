export interface CarDTO {

    id: string;
    brand: string;
    name: string;
    about: string;
    period: string;
    price: number;
    fuel_type: string;
    thumbnail: string;
    accessories:
    {
        type: string;
        name: string;
    }[];
    photos: {
        car_id: string;
        id: string;
        photo: string
    }[];

}