package com.usa.computerapp.servicio;

import com.usa.computerapp.modelo.Score;
import com.usa.computerapp.repositorio.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score score) {
        if (score.getIdScore() == null) {
            return scoreRepository.save(score);
        } else {
            Optional<Score> score1 = scoreRepository.getScore(score.getIdScore());
            if (score1.isEmpty()) {
                return scoreRepository.save(score);
            } else {
                return score;
            }
        }
    }

    public Score update(Score score){
        if(score.getIdScore()!=null){
            Optional<Score> g= scoreRepository.getScore(score.getIdScore());
            if(!g.isEmpty()){
                if(score.getMessageText()!=null){
                    g.get().setMessageText(score.getMessageText());
                }
                if(score.getStars()!=null){
                    g.get().setStars(score.getStars());
                }
                return scoreRepository.save(g.get());
            }
        }
        return score;
    }

    public boolean deleteScore (int id){
        Boolean d = getScore(id).map(score -> {
            scoreRepository.delete(score);
            return true;
        }).orElse(false);
        return d;
    }
}
