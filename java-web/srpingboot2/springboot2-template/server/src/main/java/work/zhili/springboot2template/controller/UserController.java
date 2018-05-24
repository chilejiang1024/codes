package work.zhili.springboot2template.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import work.zhili.springboot2template.core.http.response.Response;
import work.zhili.springboot2template.core.util.UUIDUtils;
import work.zhili.springboot2template.model.User;
import work.zhili.springboot2template.service.IUserService;

/**
 * Title : work.zhili.springboot2template.controller <br>
 * Description :
 *  <p>
 *  <ul> 
 *      <li>
 *  </ul>
 * @author chile
 * @version 1.0
 * @date 2018/5/4 14:27
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/v1/users")
    public Object queryAll() {
        return userService.queryAllForTesting();
    }

    @PostMapping("/v1/users")
    public Object add(@RequestParam String username, @RequestParam String password) {
        User user = new User();
        user.setId(UUIDUtils.getUuid());
        user.setUsername(username);
        user.setPassword(password);
        userService.insert(user);
        return Response.SUCCESSFUL_MESSAGE;
    }

    @DeleteMapping("/v1/users")
    public Object delete(String userId) {
        userService.invalid(userId);
        return Response.SUCCESSFUL_MESSAGE;
    }

    @PatchMapping("/v1/users")
    public Object update(@RequestBody User user) {
        userService.update(user);
        return Response.SUCCESSFUL_MESSAGE;
    }

    @GetMapping("/v1/users/{userId}")
    public ResponseEntity<User> select(@PathVariable String userId) {
        User user = userService.select(userId);
        return ResponseEntity.ok(user);
    }
}
