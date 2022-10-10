package com.usa.computerapp.servicio;

import com.usa.computerapp.modelo.Admin;
import com.usa.computerapp.repositorio.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id){
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin admin) {
        if (admin.getId() == null) {
            return adminRepository.save(admin);
        } else {
            Optional<Admin> admin1 = adminRepository.getAdmin(admin.getId());
            if (admin1.isEmpty()) {
                return adminRepository.save(admin);
            } else {
                return admin;
            }
        }
    }

    public Admin update(Admin admin){
        if(admin.getId()!=null){
            Optional<Admin>g= adminRepository.getAdmin(admin.getId());
            if(!g.isEmpty()){
                if(admin.getName()!=null){
                    g.get().setName(admin.getName());
                }
                if(admin.getPassword()!=null){
                    g.get().setPassword(admin.getPassword());
                }
                if(admin.getEmail()!=null){
                    g.get().setEmail(admin.getEmail());
                }
                return adminRepository.save(g.get());
            }
        }
        return admin;
    }

    public boolean deleteAdmin (int id){
        Boolean d = getAdmin(id).map(admin -> {
            adminRepository.delete(admin);
            return true;
        }).orElse(false);
        return d;
    }
}
