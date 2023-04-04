#[contract]

mod CounterNum {

   struct Storage {

       energy: felt252,

   }

   #[external]

   fn charge() {

       energy::write(energy::read() + 1);

   }

   #[view]

   fn get_energy() -> felt252 {

       energy::read()

   }

}
