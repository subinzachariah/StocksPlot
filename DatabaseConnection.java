import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.TreeMap;

import org.json.JSONObject;

class DatabaseConnection{ 
public static JSONObject getEntry(){
	return getItems();
}
public static JSONObject getItems(){  
try{  

	 Class driver_class = Class.forName("com.mysql.cj.jdbc.Driver");
     Driver driver = (Driver) driver_class.newInstance();
     DriverManager.registerDriver(driver);
Connection con=DriverManager.getConnection(  
"jdbc:mysql://localhost:3306/stocks","root","User1234");  
LinkedHashMap<Date,ArrayList<Float>> map = new LinkedHashMap<>();
Statement stmt=con.createStatement();  
ResultSet rs=stmt.executeQuery("select * from data");  
while(rs.next()) {
	ArrayList<Float> list = new ArrayList<>();
	list.add(rs.getFloat(2));
	list.add(rs.getFloat(3));
	map.put(rs.getDate(1), list);
}
con.close();  
JSONObject json = new JSONObject(map);
return json;
}catch(Exception e){ System.out.println(e); return null;}  
} 
} 
