<?php

namespace App\Http\Controllers;
use App\Offering;
use Illuminate\Http\Request;

class ApiController extends Controller
{

 



    public function getAllOfferings() {
        // logic to get all records goes here

        $offerings = Offering::get()->toJson(JSON_PRETTY_PRINT);
        return response($offerings, 200);
      }
  
      public function createOffering(Request $request) {
        // logic to create a offering record goes here
        $this->validate($request, [
          'full_name' => 'required|string',
          'email' => 'required|email',
         // 'message' => 'required',

        ]
            $offering = new Offering;
            $offering->full_name = $request->full_name;
            $offering->email = $request->email;
            $offering->phone = $request->phone;
            $offering->amount = $request->amount;
            $offering->donation_type = $request->donation_type;
            $offering->bank = $request->bank;

           


            $student->save();
        
            return response()->json([
                "message" => "Offering record created"
            ], 201);
         

      }
  
      public function getOffering($id) {
        // logic to get a student record goes here
        if (Offering::where('id', $id)->exists()) {
            $offering = Offering::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($offering, 200);
          } else {
            return response()->json([
              "message" => "offering not found"
            ], 404);
          }



      }
  
      public function updateOffering(Request $request, $id) {
        // logic to update a  record goes here
        if (Offering::where('id', $id)->exists()) {
            $offering = Offering::find($id);
            
           
            $offering->full_name = is_null($request->name) ? $offering->full_name : $request->full_name;
            $offering->email = is_null($request->email) ? $offering->email :$request->email;
            $offering->phone = is_null($request->phone) ? $offering->phone :$request->phone;
            $offering->amount = is_null($request->amount) ? $offering->amount :$request->amount;
            $offering->donation_type = is_null($request->donation_type) ? $offering->donation_type :$request->donation_type;
            $offering->bank =is_null($request->bank) ? $offering->bank : $request->bank;
           
            $student->save();
    
            return response()->json([
                "message" => "records updated successfully"
            ], 200);
            } else {
            return response()->json([
                "message" => "offering not found"
            ], 404);
            
        }

      }
  
      public function deleteOffering ($id) {
        // logic to delete a  record goes here

        if(Offering::where('id', $id)->exists()) {
            $offering = Offering::find($id);
            $offering->delete();
    
            return response()->json([
              "message" => "records deleted"
            ], 202);
          } else {
            return response()->json([
              "message" => "offering not found"
            ], 404);
          }


      }
}
