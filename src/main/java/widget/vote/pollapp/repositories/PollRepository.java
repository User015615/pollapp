package widget.vote.pollapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import widget.vote.pollapp.model.Poll;
@Repository
public interface PollRepository extends JpaRepository<Poll,Long> {
}
