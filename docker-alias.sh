alias blog="ENV_FILE=.env docker-compose -p bruce_blog -f docker-compose.yml"
alias blog-up="blog up --build -d"
alias blog-logs="blog logs -f"
alias blog-frc="blog-up --force-recreate"
alias blog-frc-nd="blog-frc --no-deps"
