using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class ClientController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ClientController> _logger;

    public ClientController(ApplicationDbContext context, ILogger<ClientController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetClientById(int id)
    {
        var client = await _context.Clients.FindAsync(id);

        if (client == null)
        {
            return NotFound(); // 404
        }

        _logger.LogInformation("Client with ID {ClientId} has been read: {@Client}", id, client);
        return Ok(client);
    }

    [HttpGet("clients")]
    public async Task<IActionResult> GetAllClients()
    {
        var clients = await _context.Clients.ToListAsync(); // Assuming Entity Framework is being used

        if (clients == null || !clients.Any())
        {
            return NotFound(); // Or return an empty list, depending on your requirements
        }

        _logger.LogInformation("All clients have been retrieved: {@Clients}", clients);
        return Ok(clients);
    }


    [HttpGet("ByName")]
    public IActionResult GetClientByName([FromQuery] string name)
    {
        var client = _context.Clients.FirstOrDefault(c => c.Name == name);

        if (client == null)
        {
            return NotFound(); // 404
        }

        _logger.LogInformation("Client with Name {ClientName} has been read: {@Client}", name, client);
        return Ok(client);
    }

    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody] Client client)
    {
        if (client == null)
        {
            return BadRequest(); // 400
        }

        _context.Clients.Add(client);
        await _context.SaveChangesAsync(); // save changes

        _logger.LogInformation("Client with ID {ClientId} has been created: {@Client}", client.Id, client);
        return CreatedAtAction(nameof(GetClientById), new { id = client.Id }, client); // 201
    }
}
