package com.ninos.controller.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.service.admin.AdminService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminController {


    private final AdminService adminService;


    @PostMapping("/category")
    public ResponseEntity<CategoryDTO> addCategory(@ModelAttribute CategoryDTO categoryDTO) throws IOException {
        CategoryDTO categoryDTO1 = adminService.addCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryDTO1);
    }



    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories(){
        List<CategoryDTO> allCategories = adminService.getAllCategories();
        return ResponseEntity.ok(allCategories);
    }


    @GetMapping("/categories/search/{name}")
    public ResponseEntity<List<CategoryDTO>> getAllCategoriesByTitle(@PathVariable String name){
        List<CategoryDTO> allCategories = adminService.getAllCategoriesByName(name);
        return ResponseEntity.ok(allCategories);
    }



    @PostMapping("{categoryId}/product")
    public ResponseEntity<ProductDTO> postProduct(@PathVariable Long categoryId,
                                                   @ModelAttribute ProductDTO productDTO) throws IOException {
        ProductDTO productDTO1 = adminService.addProduct(categoryId, productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDTO1);
    }


    @GetMapping("/{categoryId}/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(@PathVariable Long categoryId){
        List<ProductDTO> allProducts = adminService.getAllProductsByCategory(categoryId);
        return ResponseEntity.ok(allProducts);
    }


    @GetMapping("/{categoryId}/product/{title}")
    public ResponseEntity<List<ProductDTO>> getAllProductsByCategoryAndTitle(@PathVariable Long categoryId,
                                                                              @PathVariable String title){
        List<ProductDTO> allProducts = adminService.getProductsByCategoryIdAndName(categoryId,title);
        return ResponseEntity.ok(allProducts);
    }




    @DeleteMapping("/product/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId){
        adminService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId){
        ProductDTO productDTO = adminService.getProduct(productId);
        return ResponseEntity.ok(productDTO);
    }


    @PutMapping("/product/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId,
                                           @ModelAttribute ProductDTO productDTO) throws IOException {
        ProductDTO updatedProduct = adminService.updateProduct(productId, productDTO);
        if(updatedProduct == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
            return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
    }


}
