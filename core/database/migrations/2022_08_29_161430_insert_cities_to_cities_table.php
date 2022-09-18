<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertCitiesToCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $cities = [
            [
                'name'        => 'Aluthgama',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Agalawatta',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Bandaragama',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Beruwala',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Bulathsinhala',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Dodangoda',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Horana',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Ingiriya',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kalutara',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Madurawela',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Matugama',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Millaniya',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Baduraliya',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Panadura',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Walallavita',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Wadduwa',
                'district_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Fort',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Slave Island',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Union Place',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kollupitiya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Bambalapitiya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Havelock Town',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kirulapone',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Matara',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kirulapone North',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Narahenpita',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Wellawatte',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Pamankada',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Cinnamon Gardens',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Borella',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Dematagoda',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Maradana',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Panchikawatte',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Pettah',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Hulftsdorp',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kotahena',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Bloemendhal',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Grandpass',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Modara',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Mattakkuliya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Madampitiya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Nawala',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Rajagiriya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Angoda',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Athurugiriya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Battaramulla',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Biyagama',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Boralesgamuwa',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Dehiwala',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kadawatha',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kelaniya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kaduwela',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kalubowila',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kandana',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kesbewa',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kiribathgoda',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kolonnawa',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Koswatte',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kotikawatta',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kottawa',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Gothatuwa',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Hokandara',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Homagama',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Ja-Ela',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Maharagama',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Malabe',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Moratuwa',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Mount Lavinia',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Pannipitiya',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Pelawatte',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Peliyagoda',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Piliyandala',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Ragama',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Ratmalana',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Thalawathugoda',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Wattala',
                'district_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ]
        ];

        DB::table('cities')
            ->insert($cities);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('cities')
        ->whereIn('id', [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
            27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
            56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
        ])->delete();
    }
}
